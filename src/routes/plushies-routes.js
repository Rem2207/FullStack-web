import express from 'express';
import {
    createPlushie,
    getAllPlushies,
    getPlushieById,
    updatePlushie,
    deletePlushie
} from '../controllers/plushies-controllers.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Definir las rutas
router.post('/', createPlushie);
router.get('/',verifyToken, getAllPlushies);
router.get('/:id', getPlushieById);
router.patch('/:id', updatePlushie);
router.delete('/:id', deletePlushie);

export default router;