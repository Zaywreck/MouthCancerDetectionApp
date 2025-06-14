from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from controllers.doctor_image_controller import DoctorImageController
from controllers.image_controller import ImageController
from typing import Optional, List
from schemas.image_upload import ImageUploadOut

router = APIRouter(prefix="/images", tags=["images"])

# User upload endpoints
@router.post("/upload")
async def upload_image(
    user_id: int = Query(..., description="User ID"),
    file: UploadFile = File(...),
    is_normal: bool = Query(True, description="Is normal photo"),
    is_doctor_test: bool = Query(False, description="Is doctor test"),
    db: AsyncSession = Depends(get_db)
):
    """Upload image for classification"""
    if is_doctor_test:
        return await DoctorImageController.doctor_test_upload(user_id, file, is_normal, db)
    else:
        return await ImageController.upload_image(user_id, file, is_normal, db)

@router.get("/user-uploads")
async def get_user_uploads(
    user_id: int = Query(..., description="User ID"),
    db: AsyncSession = Depends(get_db)
) -> List[ImageUploadOut]:
    """Get user's uploaded images"""
    return await ImageController.get_user_uploads(user_id, db)

# Doctor endpoints
@router.get("/doctor-requests")
async def get_doctor_requests(
    status: Optional[str] = Query(None, description="Filter by status: pending, approved, rejected"),
    db: AsyncSession = Depends(get_db)
) -> List[ImageUploadOut]:
    """Get doctor requests with optional status filtering"""
    return await DoctorImageController.get_doctor_requests(db, status)

@router.get("/doctor-request-statistics")
async def get_doctor_request_statistics(
    db: AsyncSession = Depends(get_db)
) -> dict:
    """Get doctor request statistics"""
    return await DoctorImageController.get_request_statistics(db)

@router.get("/upload/{upload_id}")
async def get_image_upload_by_id(
    upload_id: int,
    db: AsyncSession = Depends(get_db)
) -> ImageUploadOut:
    """Get image upload by ID"""
    return await ImageController.get_image_upload_by_id(upload_id, db)

@router.put("/update-request/{request_id}")
async def update_request_status(
    request_id: int,
    status: str = Query(..., description="New status: approved or rejected"),
    doctor_comment: str = Query("", description="Doctor comment"),
    db: AsyncSession = Depends(get_db)
) -> dict:
    """Update request status by doctor"""
    return await DoctorImageController.update_request_status(request_id, status, doctor_comment, db)

# Doctor test endpoints
@router.post("/doctor-test-classification")
async def doctor_test_classification(
    doctor_id: int = Query(..., description="Doctor ID"),
    file: UploadFile = File(...),
    is_normal: bool = Query(True, description="Is normal photo"),
    db: AsyncSession = Depends(get_db)
) -> dict:
    """Doctor test classification"""
    return await DoctorImageController.doctor_test_classification(doctor_id, file, is_normal, db)

@router.get("/doctor-test-history")
async def get_doctor_test_history(
    doctor_id: int = Query(..., description="Doctor ID"),
    db: AsyncSession = Depends(get_db)
) -> List[ImageUploadOut]:
    """Get doctor test history"""
    return await DoctorImageController.get_doctor_test_history(doctor_id, db)

# Model management endpoints
@router.get("/model-status")
async def get_model_status() -> dict:
    """Get model status"""
    return DoctorImageController.get_model_status()

@router.post("/clear-model-cache")
async def clear_model_cache() -> dict:
    """Clear model cache"""
    return DoctorImageController.clear_model_cache()

@router.post("/test-classification")
async def test_classification(
    image_path: str = Query(..., description="Image path"),
    debug: bool = Query(True, description="Debug mode"),
) -> dict:
    """Test classification"""
    return DoctorImageController.test_classification(image_path, debug)

# File serving
@router.get("/uploads/{filename}")
async def get_uploaded_file(filename: str):
    """Serve uploaded files"""
    file_path = f"uploads/{filename}"
    return FileResponse(file_path) 