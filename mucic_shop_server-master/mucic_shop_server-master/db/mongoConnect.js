const mongoose = require("mongoose");
const {config}=require("../config/secret")

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${config.userDb}:${config.passDb}@cluster0.r1mnv.mongodb.net/projects_stop_music`
  );
  console.log("Mongo Connected  - projects_stop_musica");
}
