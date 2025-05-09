import express from 'express';
import routeProduct from '../routes/product';
import routeUser from '../routes/user';
import cors from 'cors';

class Server {
    private app: express.Application;
    private port: string;
    private host: string = 'localhost';

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port,()=> {
            console.log(`Server is running on http://${this.host}:${this.port}`);
        } )
    }

    routes() {
        this.app.use('/api/products', routeProduct);
        this.app.use('/api/users', routeUser);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors())
    }

}

export default Server;