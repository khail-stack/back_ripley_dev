"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const router = (0, express_1.Router)();
router.get('/age/average', customers_1.getAverageAge);
router.get('/gender/average', customers_1.getAverageMaleFemale);
router.get('/', customers_1.getCustomers);
router.get('/:id', customers_1.getCustomer);
router.post('/', customers_1.postCustomer);
router.put('/:id', customers_1.putCustomer);
router.delete('/:id', customers_1.deleteCustomer);
exports.default = router;
//# sourceMappingURL=customer.js.map