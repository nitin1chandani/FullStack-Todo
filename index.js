const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;
app.use(bodyParser.json());

let todos = [];
app.get("/todos", (req, res) => {
  res.json(todos);
});

const findIndex = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }
  return -1;
};
const removeAtIndex = (arr, index) => {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
};
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    description: req.body.description,
  };
  todos.push(newTodo);
  res.status(200).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send();
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// app.use((req, res, next) => {
//   res.status(404).send();
// });
app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
