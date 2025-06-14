from fastapi import HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import text
from models.image_upload import ImageUpload
from schemas.image_upload import ImageUploadOut
from utils.normal_classifier import normal_classifier, clear_model_cache
from utils.histopathology_classifier import histopathology_classifier
import os
import shutil
from datetime import datetime
from typing import List, Optional

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class DoctorImageController:
    
    @staticmethod
    async def doctor_test_upload(
        user_id: int,
        file: UploadFile,
        is_normal: bool,
        db: AsyncSession
    ) -> ImageUpload:
        """Doktor test upload işlemi"""
        # Kullanıcı kontrolü
        result = await db.execute(text("SELECT * FROM users WHERE id = :id"), {"id": user_id})
        user_data = result.fetchone()
        if not user_data:
            raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
        
        user_type = dict(user_data._mapping).get('user_type', 'user')
        
        # Dosya kaydetme
        file_extension = file.filename.split('.')[-1]
        file_name = f"{user_id}_doctor_test_{'normal' if is_normal else 'histopathology'}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, file_name)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # AI Model classification
        try:
            print(f"🩺 Doctor test classification for user_id: {user_id}, is_normal: {is_normal}")
            if is_normal:
                model_result = normal_classifier(file_path, debug=True)  # Debug mode for doctor tests
            else:
                model_result = histopathology_classifier(file_path)
            print(f"✅ Doctor test result for user {user_id}: {model_result}")
        except Exception as e:
            print(f"❌ Doctor test error: {str(e)}")
            model_result = f"Sınıflandırma hatası: {str(e)}"

        # Database'e kaydet
        image_upload = ImageUpload(
            user_id=user_id, 
            file_path=file_path, 
            is_normal=is_normal,
            model_result=model_result,
            status="doctor_test"  # Doktor testleri farklı status
        )
        db.add(image_upload)
        await db.commit()
        await db.refresh(image_upload)

        print(f"🩺 Doctor test completed for user {user_id}: {model_result}")
        return image_upload

    @staticmethod
    async def doctor_test_classification(
        doctor_id: int,
        file: UploadFile,
        is_normal: bool,
        db: AsyncSession
    ) -> dict:
        """Doktor için özel test endpoint'i - geçici dosya ile classification"""
        # Doktor olup olmadığını kontrol et
        result = await db.execute(
            text("SELECT user_type FROM users WHERE id = :id"), 
            {"id": doctor_id}
        )
        user = result.fetchone()
        if not user or dict(user._mapping).get('user_type') != 'doctor':
            raise HTTPException(status_code=403, detail="Bu işlem sadece doktorlar için geçerlidir")
        
        # Geçici dosya oluştur
        file_extension = file.filename.split('.')[-1]
        temp_file_name = f"temp_doctor_test_{doctor_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.{file_extension}"
        temp_file_path = os.path.join(UPLOAD_DIR, temp_file_name)
        
        try:
            # Dosyayı geçici olarak kaydet
            with open(temp_file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            # Model çalıştır
            print(f"🩺 Doctor {doctor_id} testing image (is_normal: {is_normal})")
            if is_normal:
                model_result = normal_classifier(temp_file_path, debug=True)
            else:
                model_result = histopathology_classifier(temp_file_path)
            
            print(f"✅ Doctor test result: {model_result}")
            
            return {
                "doctor_id": doctor_id,
                "model_result": model_result,
                "is_normal": is_normal,
                "test_type": "normal" if is_normal else "histopathology",
                "timestamp": datetime.now().isoformat(),
                "status": "completed"
            }
        
        except Exception as e:
            print(f"❌ Doctor test error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Test sırasında hata oluştu: {str(e)}")
        
        finally:
            # Geçici dosyayı sil
            try:
                if os.path.exists(temp_file_path):
                    os.remove(temp_file_path)
                    print(f"🗑️ Temporary file deleted: {temp_file_name}")
            except Exception as e:
                print(f"⚠️ Failed to delete temporary file: {str(e)}")

    @staticmethod
    async def get_doctor_requests(db: AsyncSession, status: Optional[str] = None) -> List[ImageUploadOut]:
        """Doktor talepleri getir - status parametresi ile filtreleme yapılabilir"""
        if status and status not in ["pending", "approved", "rejected"]:
            raise HTTPException(status_code=400, detail="Geçersiz status. pending, approved, rejected olmalıdır.")
        
        if status:
            # Belirli status'taki talepleri getir
            query = "SELECT * FROM image_uploads WHERE status = :status ORDER BY uploaded_at DESC"
            result = await db.execute(text(query), {"status": status})
        else:
            # Tüm talepleri getir (doctor_test hariç)
            query = "SELECT * FROM image_uploads WHERE status != 'doctor_test' ORDER BY uploaded_at DESC"
            result = await db.execute(text(query))
        
        uploads = result.mappings().all()
        return [ImageUploadOut(**row) for row in uploads]

    @staticmethod
    async def update_request_status(
        request_id: int,
        status: str,
        doctor_comment: str,
        db: AsyncSession
    ) -> dict:
        """Doktor istek durumunu güncelle"""
        result = await db.execute(text("SELECT * FROM image_uploads WHERE id = :id"), {"id": request_id})
        request = result.fetchone()
        if not request:
            raise HTTPException(status_code=404, detail="Talep bulunamadı")
        if status not in ["approved", "rejected"]:
            raise HTTPException(status_code=400, detail="Geçersiz durum")

        await db.execute(
            text("UPDATE image_uploads SET status = :status, doctor_comments = :doctor_comments WHERE id = :id"),
            {"status": status, "doctor_comments": doctor_comment, "id": request_id}
        )
        await db.commit()

        return {"message": "Talep güncellendi"}

    @staticmethod
    async def get_doctor_test_history(doctor_id: int, db: AsyncSession) -> List[ImageUploadOut]:
        """Doktorun yaptığı test geçmişini getir"""
        # Doktor olup olmadığını kontrol et
        result = await db.execute(
            text("SELECT user_type FROM users WHERE id = :id"), 
            {"id": doctor_id}
        )
        user = result.fetchone()
        if not user or dict(user._mapping).get('user_type') != 'doctor':
            raise HTTPException(status_code=403, detail="Bu işlem sadece doktorlar için geçerlidir")
        
        # Doktor testlerini getir
        result = await db.execute(
            text("SELECT * FROM image_uploads WHERE user_id = :user_id AND status = 'doctor_test' ORDER BY uploaded_at DESC"),
            {"user_id": doctor_id}
        )
        uploads = result.mappings().all()
        return [ImageUploadOut(**row) for row in uploads]

    @staticmethod
    async def get_request_statistics(db: AsyncSession) -> dict:
        """Doktor talepleri istatistiklerini getir"""
        try:
            # Toplam talepler (doctor_test hariç)
            total_result = await db.execute(
                text("SELECT COUNT(*) as count FROM image_uploads WHERE status != 'doctor_test'")
            )
            total = total_result.fetchone()[0]
            
            # Bekleyen talepler
            pending_result = await db.execute(
                text("SELECT COUNT(*) as count FROM image_uploads WHERE status = 'pending'")
            )
            pending = pending_result.fetchone()[0]
            
            # Onaylanan talepler
            approved_result = await db.execute(
                text("SELECT COUNT(*) as count FROM image_uploads WHERE status = 'approved'")
            )
            approved = approved_result.fetchone()[0]
            
            # Reddedilen talepler
            rejected_result = await db.execute(
                text("SELECT COUNT(*) as count FROM image_uploads WHERE status = 'rejected'")
            )
            rejected = rejected_result.fetchone()[0]
            
            return {
                "total": total,
                "pending": pending,
                "approved": approved,
                "rejected": rejected
            }
        except Exception as e:
            print(f"❌ Error getting statistics: {str(e)}")
            return {
                "total": 0,
                "pending": 0,
                "approved": 0,
                "rejected": 0
            }

    @staticmethod
    def get_model_status() -> dict:
        """Model durumunu kontrol et"""
        try:
            # Import'u burada yap ki global değişkenlere erişebilelim
            import utils.normal_classifier as nc
            
            # Model yüklü mü kontrol et
            model_loaded = nc._normal_classifier_model is not None
            load_time = nc._model_load_time
            
            status = {
                "model_loaded": model_loaded,
                "load_time": load_time,
                "status": "active" if model_loaded else "not_loaded"
            }
            
            if load_time:
                status["load_time_formatted"] = datetime.fromtimestamp(load_time).isoformat()
            
            # Eğer model yüklü değilse bir kez yüklemeyi dene
            if not model_loaded:
                try:
                    print("🔄 Model not loaded, attempting to load...")
                    model = nc.load_normal_classifier_model()
                    if model is not None:
                        status.update({
                            "model_loaded": True,
                            "load_time": nc._model_load_time,
                            "status": "active",
                            "auto_loaded": True
                        })
                        if nc._model_load_time:
                            status["load_time_formatted"] = datetime.fromtimestamp(nc._model_load_time).isoformat()
                        print("✅ Model auto-loaded successfully")
                except Exception as load_error:
                    print(f"❌ Failed to auto-load model: {str(load_error)}")
                    status["load_error"] = str(load_error)
            
            return status
        
        except Exception as e:
            print(f"❌ Error checking model status: {str(e)}")
            return {
                "model_loaded": False,
                "error": str(e),
                "status": "error"
            }

    @staticmethod
    def clear_model_cache() -> dict:
        """Model cache'ini temizle"""
        try:
            clear_model_cache()
            return {"message": "Model cache cleared successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error clearing cache: {str(e)}")

    @staticmethod
    def test_classification(image_path: str, debug: bool = True) -> dict:
        """Test classification with debug information"""
        if not os.path.exists(image_path):
            raise HTTPException(status_code=404, detail="Image file not found")
        
        try:
            result = normal_classifier(image_path, debug=debug)
            return {
                "image_path": image_path,
                "classification_result": result,
                "debug_enabled": debug
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Classification error: {str(e)}") 