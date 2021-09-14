import express from "express";
import cors from "cors";

import listEndpoints from "express-list-endpoints";
// import postStirve from "./posts/posts.js";
import authorStrive from "./authors/authors.js";

// === Server ===
const server = express();
const port = 3003;

// === COnfiguration | Before endpoints! ===
// body converter
server.use(cors());
server.use(express.json());
// ==== ROUTES / ENDPOINTS ====
server.use("/authors", authorStrive);

server.listen(port, () => {});
console.table(listEndpoints(server));
