import express from 'express';
import {
    createAccesory,
    getAllAccessories,
    getAccesoryById,
    updateAccesory,
    deleteAccesory
} from '../controllers/accessories-controllers.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Definir las rutas
router.post('/', createAccesory);
router.get('/',verifyToken ,getAllAccessories);
router.get('/:id', getAccesoryById);
router.patch('/:id', updateAccesory);
router.delete('/:id', deleteAccesory);

export default router;