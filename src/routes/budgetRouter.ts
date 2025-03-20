import { Router } from 'express';
import { BugetController } from '../controllers/budgetController';

const router = Router();

router.get('/', BugetController.getAll);
router.post('/', BugetController.create);
router.get('/:id', BugetController.getById);
router.put('/:id', BugetController.updateById);
router.delete('/:id', BugetController.deleteById);

export default router;