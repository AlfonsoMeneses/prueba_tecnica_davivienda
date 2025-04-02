import { AppDataSource } from "./typeorm/data-source";

export class DataConnection {
  constructor() {}

  public static start(): Promise<Object> {
    return new Promise((resolve, reject) => {
      AppDataSource.initialize()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          //console.error(error);
          reject(error);
        });
    });
  }
}