import { Router } from 'express';
import * as linkController from '../controllers/link.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', linkController.getAllLinks);

// admin only
router.post('/', protect, linkController.createLink);
router.get('/:id', protect, linkController.getLinkById);
router.put('/:id', protect, linkController.updateLink);
router.delete('/:id', protect, linkController.deleteLink);

export default router;