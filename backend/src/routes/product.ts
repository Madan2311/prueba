import { Router } from 'express';
import { getProducts } from '../controllers/product.js';
import validateToken from './validate-token.js';

const router = Router();

router.get('/', validateToken, getProducts);

export default router;