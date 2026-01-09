import express from 'express';
const router = express.Router();
import { updateProfile, getMyProfile, applyForJob, getMyApplications } from '../controllers/teacherController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

// Profile routes
router.get('/profile/me', protect, authorize('teacher'), getMyProfile);
router.post('/profile', protect, authorize('teacher'), updateProfile);

// Application routes
router.post('/apply/:schoolId', protect, authorize('teacher'), applyForJob);
router.get('/applications', protect, authorize('teacher'), getMyApplications);

export default router;
