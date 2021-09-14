import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
// =
const postStirve = express.Router();
// PATH
const curentJson = fileURLToPath(import.meta.url);
const currentDirP = dirname(curentJson);
const striveJson = join(currentDirP, "postLib.json");
console.log("Posts Dir -", currentDirP);
console.log("striveJson -", striveJson);

// GET
postStirve.get("/", (req, res) => {
  const studFile = fs.readFileSync(striveJson);
  const strivers = JSON.parse(studFile);
  //   return file
  res.send(strivers);
});
//  POST
postStirve.post("/", (req, res) => {
  console.log("Request", req.body);
  // read the request body and response
  const newPost = { ...req.body, id: uniqid(), createdAt: new Date() };
  console.log(newStud);
  //   PATH
  const students = JSON.parse(fs.readFileSync(studentJson));
  // PUSH
  students.push(newStud);
  //   write array back to the file
  fs.writeFileSync(studentJson, JSON.stringify(students));
  //   RESPONSE
  console.log(students);
  res.status(201).send(newStud);
});
// READ / GET /:id
postStirve.get("/:studentID", (req, res) => {
  console.log(req.params.studentID);
  const students = JSON.parse(fs.readFileSync(studentJson));
  //  find by id
  const student = students.find((s) => s.id == req.params.studentID);
  // return
  if (student) {
    res.send(student);
  } else {
    res.status(401);
  }
});
// UPDATE / PUT /:id
postStirve.put("/:studentID", (req, res) => {
  // Get students
  const students = JSON.parse(fs.readFileSync(studentJson));
  //   modify student
  //   const remainStud = students.filter((stud) => stud.id != req.params.studentID);
  //   const updateStud = { ...req.body, id: req.params.studentID };
  //   remainStud.push(updateStud);
  // Index
  const index = students.findIndex(
    (student) => student.id == req.params.studentID
  );
  const updatedStudent = { ...students[index], ...req.body };
  students[index] = updatedStudent;
  //   write array back to the file
  fs.writeFileSync(studentJson, JSON.stringify(students));
  // read students
  res.status(203).send(students);
});
// DELETE / :id
postStirve.delete("/:studentID", (req, res) => {
  // Get students
  const students = JSON.parse(fs.readFileSync(studentJson));
  // FIlter student id
  const remainStudent = students.filter(
    (std) => std.id != req.params.studentID
  );
  //   write array back to the file
  fs.writeFileSync(studentJson, JSON.stringify(remainStudent));
  console.log(remainStudent);
  res.status(204).send();
});

export default postStirve;