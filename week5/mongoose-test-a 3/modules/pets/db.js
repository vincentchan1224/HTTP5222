const mongoose = require("mongoose"); //import Mongoose

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number
});
const Pet = mongoose.model("Pet", PetSchema);

//MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
}

//Get all pets from the pets collection
async function getPets() {
  await connect();
  return await Pet.find({}).sort({ age: 1 }); //return array for find all
}
//Initialize pets collection with some data.
async function initializePets() {
  const petList = [
    {
      name: "Max",
      type: "cat",
      breed: "Norwegian forest cat",
      age: 7  
    },
    {
      name: "Rex",
      type: "dog",
      breed: "German Shepherd",
      age: 9
    },
    {
      name: "Fred",
      type: "fish",
      breed: "Koi",
      age: 1
    }
  ];
  await Pet.insertMany(petList);
}
//Function to add a pet to the pets collection
async function addPet(petName, petType, petBreed, petAge) {
  let newPet = new Pet({
    name: petName,
    type: petType,
    breed: petBreed,
    age: petAge
  });
  newPet.save(); //this is the line which actually saves newPet to the DB
}
//Function to update pet name
async function updateName(oldName, newName) {
  await Pet.updateOne(
    { name: oldName },
    { name: newName }
  );
}

module.exports = {
  getPets,
  initializePets,
  addPet,
  updateName
}