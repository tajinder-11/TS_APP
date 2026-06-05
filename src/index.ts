import express from "express";
import pg from "pg";
import {Redis} from "ioredis";


const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "TypeScript Express server is running",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

async function init() {
  console.log("connecting redis ....");
  const redis = new Redis("redis://localhost:6379", { lazyConnect: true });
  await redis.connect();
  console.log("redis connected");

  console.log("Connection postgres ....");
  const {Client} = pg;
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  });
  await client.connect();
  console.log("postgres connected");
  app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
  });
}

init();