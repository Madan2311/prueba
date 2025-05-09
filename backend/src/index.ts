import dotenv from "dotenv";
import Server from "./models/server";
import { getConnection } from "./db/connection";

dotenv.config();

const server = new Server();
server.listen();