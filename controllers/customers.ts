import { Request, Response } from 'express'
import Customer from '../models/customer';

export const getCustomers = async ( req : Request, res: Response ) => {
    const customers = await Customer.findAll({where: {state: true}});
    res.json({customers});
}

export const getCustomer = async ( req : Request, res: Response ) => {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (customer) {
        res.json(customer)
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
}

export const postCustomer = async ( req: Request, res: Response ) => {
    const { body } = req;
    try {
        const customer = Customer.build(body);
        await customer.save();
        res.json(customer)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error'
        })
    }
}

export const putCustomer = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({
                msg: `No existe un usuario con el ${id}`
            });
        }
        await customer.update(body);
        res.json(customer)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error'
        })
    }
}

export const deleteCustomer = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
        return res.status(404).json({
            msg: `No existe un usuario con el ${id}`
        });
    }
    await customer.update({state: false})
    res.json(customer)
}

export const getAverageAge = async ( req: Request, res: Response ) => {
    const customers = await Customer.findAll({where: {state: true}});
    const today = new Date();
    const arrayAges: number[] = []
    customers.forEach(({birthdate} : any) => {
        const formatBirthdate = new Date(birthdate)
        let age = today.getFullYear() - formatBirthdate.getFullYear();
        const month = today.getMonth() - formatBirthdate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < formatBirthdate.getDate())) {
            age--;
        }
        arrayAges.push(age)
    })
    let sum = arrayAges.reduce((previous, current) => current += previous);
    let avg = Math.round(sum / arrayAges.length);
    res.json({avg})
}