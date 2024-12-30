const mongoose = require("mongoose");
const chat = require("./models/chat.js");

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


let allChats = [
  {
    from: "somen",
    to: "ankit",
    msg: "you are a dumd person bro",
    created_at: new Date(),
  },
  {
    from: "ram",
    to: "sam",
    msg: "you are failed bro",
    created_at: new Date(),
  },
  {
    from: "dhoni",
    to: "kisha",
    msg: "jharkhand se hai bhai log",
    created_at: new Date(),
  },
];

chat.insertMany(allChats);
