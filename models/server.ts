import express, { Application } from 'express';
import customerRoutes from '../routes/customer';
import cors from 'cors'
import db from '../database/connection';
class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        customers: '/api/customers'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database Online')
        } catch (error) {
            throw new Error(`${error}`);   
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.customers, customerRoutes)
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;