import express, { Router } from "express";
import morgan from 'morgan'
import cors from 'cors'


import { AppRoutes } from './routes'

interface Options {
    port: number;
    routes?: Router;
}


export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    public constructor(options: Options) {
        this.port = options.port ?? 3000;
        this.routes = AppRoutes.routes;

    }

    private setMiddlerwares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    private setRoutes() {
        this.app.use('/api',this.routes);
    }


    public start() {

        this.setMiddlerwares();

        this.setRoutes();

        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on port ${this.port}`);
        });
    }
}


