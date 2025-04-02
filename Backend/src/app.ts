
import "reflect-metadata"

import { envs } from './config/envs';
import { DataConnection } from './infrastructure/data-conection';

import { Server } from './presentation/server';


(async() => {
  await main();
})();


async function main(){
  
  // Inicializa la conexión a la base de datos
  DataConnection.start()
  .then(() => {

    //
    console.log("📦 Database connection established..");

    // Inicializa el servidor
    const server = new Server({
      port: envs.PORT
    });

    server.start();

  })
  .catch((error) => console.error("❌ Error connecting to the database:", error));
    

 
}
