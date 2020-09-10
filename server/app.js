const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const users = [
  { id: 1, username: "Ivan", full_name: "Ivanov Ivan" },
  { id: 2, username: "Petr", full_name: "Ivanov Petr" },
  { id: 3, username: "Serega", full_name: "Ivanov Serega" },
  { id: 4, username: "Kolya", full_name: "Ivanov Kolya" },
  { id: 5, username: "Anatoly", full_name: "Ivanov Anatoly" },
  { id: 6, username: "Semen", full_name: "Ivanov Semen" },
];

app.use(bodyParser.json())
app.use("/", function (req, res, next) {
  console.log("req: ", req.url);
  next();
});
app.get("/api/users/", function (req, res) {
  res.send(JSON.stringify(users));
});
app.get("/api/users/:username", function (req, res) {
  const user = users.find((u) => u.username === req.params.username);
  if (user) {
    res.send(JSON.stringify(user));
  } else {
    res.status(404);
    res.end();
  }
});
app.put("/api/users/:username", function (req, res) {
  const index = users.findIndex((u) => u.username === req.params.username);  
  const newName = req.body.full_name.trim();
  if (index !== -1 && newName) {
    users[index].full_name = newName;
    res.send(JSON.stringify(users[index]));
  } else {
    res.status(404);
    res.end();
  }
});

app.listen(3000);
