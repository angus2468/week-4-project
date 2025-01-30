import express, { request, response } from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

app.get("/", (request, response) => response.json("Hello (◕ᴥ◕ʋ)"));

app.get("/messages", async (request, response) => {
  const result = await db.query(`SELECT * FROM messages`);
  response.json(result);
});

app.post("/messages", async (request, response) => {
  const authorFromClient = request.body.author;
  const messageFromClient = request.body.message;
  const data = await db.query(
    `INSERT INTO messages (author, message) VALUES ('${authorFromClient}', '${messageFromClient}')`
  );
  response.json(data);
});

app.delete("/messages/:id", async (request, response) => {
  const deleted = await db.query(`DELETE FROM messages WHERE id = $1`, [
    request.params.id,
  ]);
});

app.listen(8080, () => {
  console.log("The server is running and listening on port 8080");
});
