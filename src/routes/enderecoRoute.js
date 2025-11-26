import express from 'express';
import EnderecoController from '../controllers/EnderecoController.js';

const router = express.Router();

router.post('/', EnderecoController.criar);
router.get('/usuarios/:usuarioId', EnderecoController.listarPorUsuario);
router.put('/:id', EnderecoController.atualizar);
router.delete('/:id', EnderecoController.deletar);

export default router;
