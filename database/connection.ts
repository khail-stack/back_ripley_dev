import { Sequelize } from "sequelize";

const db = new Sequelize('df5j64angfrsob', 'rrphxwudhimqqc', '16bffe170d59b149d0fc7528c753341e4467c042dec4fb8a2465b876062d6949', {
    host: 'ec2-34-224-239-147.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default db;