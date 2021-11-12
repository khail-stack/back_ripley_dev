"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageMaleFemale = exports.getAverage = exports.getAverageAge = exports.deleteCustomer = exports.putCustomer = exports.postCustomer = exports.getCustomer = exports.getCustomers = void 0;
const customer_1 = __importDefault(require("../models/customer"));
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customer_1.default.findAll({ where: { state: true } });
    res.json({ customers });
});
exports.getCustomers = getCustomers;
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customer = yield customer_1.default.findByPk(id);
    if (customer) {
        res.json(customer);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getCustomer = getCustomer;
const postCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const customer = customer_1.default.build(body);
        yield customer.save();
        res.json(customer);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error'
        });
    }
});
exports.postCustomer = postCustomer;
const putCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const customer = yield customer_1.default.findByPk(id);
        if (!customer) {
            return res.status(404).json({
                msg: `No existe un usuario con el ${id}`
            });
        }
        yield customer.update(body);
        res.json(customer);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error'
        });
    }
});
exports.putCustomer = putCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customer = yield customer_1.default.findByPk(id);
    if (!customer) {
        return res.status(404).json({
            msg: `No existe un usuario con el ${id}`
        });
    }
    yield customer.update({ state: false });
    res.json(customer);
});
exports.deleteCustomer = deleteCustomer;
const getAverageAge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customer_1.default.findAll({ where: { state: true } });
    const today = new Date();
    const arrayAges = [];
    customers.forEach(({ birthdate }) => {
        const formatBirthdate = new Date(birthdate);
        let age = today.getFullYear() - formatBirthdate.getFullYear();
        const month = today.getMonth() - formatBirthdate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < formatBirthdate.getDate())) {
            age--;
        }
        arrayAges.push(age);
    });
    let sum = arrayAges.reduce((previous, current) => current += previous);
    let avg = Math.round(sum / arrayAges.length);
    res.json({ avg });
});
exports.getAverageAge = getAverageAge;
const getAverage = (gender) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customer_1.default.findAll({ where: { state: true, gender: gender } });
    const today = new Date();
    const arrayAges = [];
    customers.forEach(({ birthdate }) => {
        const formatBirthdate = new Date(birthdate);
        let age = today.getFullYear() - formatBirthdate.getFullYear();
        const month = today.getMonth() - formatBirthdate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < formatBirthdate.getDate())) {
            age--;
        }
        arrayAges.push(age);
    });
    let sum = arrayAges.reduce((previous, current) => current += previous);
    let avg = Math.round(sum / arrayAges.length);
    return { count: customers.length, avg: avg };
});
exports.getAverage = getAverage;
const getAverageMaleFemale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const male = yield (0, exports.getAverage)(1);
    const female = yield (0, exports.getAverage)(2);
    const data = {
        male,
        female
    };
    res.json(data);
});
exports.getAverageMaleFemale = getAverageMaleFemale;
//# sourceMappingURL=customers.js.map