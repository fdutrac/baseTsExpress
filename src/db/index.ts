import "reflect-metadata";
import { createConnection } from "typeorm";

export async function dbConnection() {
  await createConnection()
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => console.log(error));
}
