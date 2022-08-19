import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.SERVER_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  db: process.env.DB_NAME,
};

export default config;
