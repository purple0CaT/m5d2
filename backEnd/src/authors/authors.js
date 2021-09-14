import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
// ==
const authorStrive = express.Router();
// Path to libr
const curentJson = fileURLToPath(import.meta.url);
const currentDirP = dirname(curentJson);
const authorJson = join(currentDirP, "authorsLib.json");

console.log("authorJson -", authorJson);
// Get
// GET
authorStrive.get("/", (req, res) => {
  const authorFile = fs.readFileSync(authorJson);
  const authors = JSON.parse(authorFile);
  //   return file
  res.status(201).send(authors);
});
//GET BY ID
authorStrive.get("/:postId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorJson));
  const author = authors.find((s) => s._id == req.params.postId);

  //   return file
  res.status(201).send(author);
});
// POST
authorStrive.post("/", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorJson));
  const newAuthor = { ...req.body, _id: uniqid(), createdAt: new Date() };
  if (
    req.body.name &&
    req.body.surname &&
    req.body.email &&
    req.body.avatar &&
    req.body.dateBirth
  ) {
    if (authors.find((author) => author.email === req.body.email)) {
      res.status(401).send({ Error: "Email already exists" });
    } else {
      // SUCCESS POST
      authors.push(newAuthor);
      // rewrite
      fs.writeFileSync(authorJson, JSON.stringify(authors));
      //   response
      res.status(201).send({ Yep: "its ok", body: newAuthor });
    }
  } else {
    res.status(400).send({ NotToday: "Bad request" });
  }
});
// PUT
authorStrive.put("/:postId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorJson));
  const index = authors.findIndex((author) => author._id === req.params.postId);
  if (index >= 0) {
    if (
      req.body.name &&
      req.body.surname &&
      req.body.email &&
      req.body.avatar &&
      req.body.dateBirth
    ) {
      // SUCCESS POST
      const updateAuthor = { ...authors[index], ...req.body };
      authors[index] = updateAuthor;
      //   save file
      fs.writeFileSync(authorJson, JSON.stringify(authors));
      //   response
      res.status(201).send({ Yep: "its ok", body: updateAuthor });
    } else {
      res.status(401).send({ Bad: "Request" });
    }
  } else {
    res.status(400).send({ Nope: "Bad request" });
  }
});
// delete
authorStrive.delete("/:postId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorJson));

  const filtered = authors.filter((auth) => auth._id != req.params.postId);
  //   rewrite
  fs.writeFileSync(authorJson, JSON.stringify(filtered));
  // response
  res.status(201).send();
});
export default authorStrive;
