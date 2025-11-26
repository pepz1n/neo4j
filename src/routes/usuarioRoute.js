import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';

const router = express.Router();

router.post('/', UsuarioController.criar);
router.get('/', UsuarioController.listarTodos);
router.get('/:id', UsuarioController.buscarPorId);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

export default router;
