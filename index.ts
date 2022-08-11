import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
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
