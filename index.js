const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");
const expressError = require("./ExpressError");
const { throws } = require("assert");

main()
  .then(() => {
    console.log("connected successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// let chat1 = new chat({
//   from: "priya",
//   to: "neha",
//   msg: "send me your pdf by mail",
//   created_at: new Date(),
// });

// chat1.save().then((res) => {
//   console.log(res);
// });

// Index Route
app.get("/chats", async (req, res) => {
  try {
    let chats = await chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
  } catch (err) {
    next(err);
  }
});

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Create Route
app.post("/chats", async (req, res, next) => {
  try {
    let { to, msg, from } = req.body;
    let new_chat = new chat({
      to: to,
      from: from,
      msg: msg,
      created_at: new Date(),
    });
    await new_chat.save();
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//New - Show Route
app.get("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let chats = await chat.findById(id);
    if (!chats) {
      next(new expressError(404, "chat not found"));
    }
    res.render("edit.ejs", { chats });
  } catch (err) {
    next(err);
  }
});

//Edit route
app.get("/chats/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let chatEdit = await chat.findById(id);
    res.render("edit.ejs", { chatEdit });
  } catch (err) {
    next(err);
  }
});

//update route
app.put("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidator: true, new: true }
    );
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//delete
app.delete("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let Delchats = await chat.findByIdAndDelete(id);
    console.log(Delchats);
    res.redirect("/chats");
  } catch (err) {
    nexyt(err);
  }
});

app.get("/", (req, res) => {
  res.send("working root");
});

//Erroe handling MiddleWare
app.use((err, req, res, next) => {
  let { status = 500, message = "some Error has occured!" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("server is listeniing on port 8080");
});
