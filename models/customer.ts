import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Customer = db.define('Customer', {
    name: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    birthdate: {
        type: DataTypes.DATE
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

export default Customer;