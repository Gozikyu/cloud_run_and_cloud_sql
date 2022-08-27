import express, { Request, Response } from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (_req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // .envファイルに環境変数を記載
  const connectionName = process.env.CONNECTION_NAME;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  const connection = mysql.createConnection({
    socketPath: "/cloudsql/" + connectionName,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  });

  try {
    connection.connect();
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }

  connection.query("SELECT * FROM entries;", (err: any, results: any) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
  connection.end();
});

app.post("/tasks", async (req: Request, res: Response) => {
  console.info("body:", req.body);
  return res.status(200).send({
    message: req.body || "Execute tasks!",
  });
});

try {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
