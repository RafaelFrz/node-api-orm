import { Router } from 'express';
const produto = require('../controllers/produto.controller');
const router = Router();

router.get('/', produto.getAllProdutos);
router.get('/:id', produto.getProduto);
router.post('/create', produto.createProduto);
router.post('/delete', produto.deleteProduto);
router.post('/update/:id', produto.updateProduto);

export default router;