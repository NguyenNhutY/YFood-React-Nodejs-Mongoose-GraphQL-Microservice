import express, { Request, Response, NextFunction } from 'express';
import {
  getSuppliers,

  createSupplier,

  getSupplierRecommendations,

  getSupplierByCreatedAt,
  getSupplierByUpdatedAt,
  getSupplierByDeletedAt,
  getSupplierByEmailVerifiedAt,
  getSupplierByPhoneVerifiedAt,
  getSupplierByAddressVerifiedAt,
  getSupplierByCategoryVerifiedAt,
  getSupplierByTagsVerifiedAt,
  getSupplierByStatusVerifiedAt,
  getSupplierByCreatedAtVerifiedAt,
  getSupplierByUpdatedAtVerifiedAt,
  getSupplierByDeletedAtVerifiedAt,
  getSupplierByEmailUnverifiedAt
} from '../controllers/supplierController';

// Create a new Express Router
const router = express.Router();

// Define types for the request and response handlers
type HandlerFunction = (req: Request, res: Response, next: NextFunction) => void;

// CRUD Operations
router.get('/', getSuppliers as HandlerFunction);
router.post('/', createSupplier as HandlerFunction);

// Search and Filter

// Date-Based Queries
router.get('/created-at', getSupplierByCreatedAt as HandlerFunction);
router.get('/updated-at', getSupplierByUpdatedAt as HandlerFunction);
router.get('/deleted-at', getSupplierByDeletedAt as HandlerFunction);

// Verification-Based Queries
router.get('/email-verified-at', getSupplierByEmailVerifiedAt as HandlerFunction);
router.get('/phone-verified-at', getSupplierByPhoneVerifiedAt as HandlerFunction);
router.get('/address-verified-at', getSupplierByAddressVerifiedAt as HandlerFunction);
router.get('/category-verified-at', getSupplierByCategoryVerifiedAt as HandlerFunction);
router.get('/tags-verified-at', getSupplierByTagsVerifiedAt as HandlerFunction);
router.get('/status-verified-at', getSupplierByStatusVerifiedAt as HandlerFunction);
router.get('/created-at-verified-at', getSupplierByCreatedAtVerifiedAt as HandlerFunction);
router.get('/updated-at-verified-at', getSupplierByUpdatedAtVerifiedAt as HandlerFunction);
router.get('/deleted-at-verified-at', getSupplierByDeletedAtVerifiedAt as HandlerFunction);
router.get('/email-unverified-at', getSupplierByEmailUnverifiedAt as HandlerFunction);

router.get('/:id/recommendations', getSupplierRecommendations as HandlerFunction);

export default router;
