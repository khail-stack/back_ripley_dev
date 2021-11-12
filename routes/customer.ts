import { Router } from "express";
import { deleteCustomer, getAverageAge, getAverageMaleFemale, getCustomer, getCustomers, postCustomer, putCustomer } from "../controllers/customers";

const router = Router();

router.get('/age/average', getAverageAge);
router.get('/gender/average', getAverageMaleFemale);
router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.post('/', postCustomer);
router.put('/:id', putCustomer);
router.delete('/:id', deleteCustomer);

export default router;