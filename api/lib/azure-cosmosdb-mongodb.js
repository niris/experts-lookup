const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    skills: {
      concepts: [{ type: String }],
      languages: [{ type: String }],
      tools: [{ type: String }],
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    userId:{type: String, required:true}
    //mongoose.Schema.Types.ObjectId
  });

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    environment: [{ type: String }]
});


const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});


async function init() {
  if (mongoose.connection.readyState === 0) {
    try {
      connection = await mongoose.connect(process.env.CosmosDbConnectionString,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to database successfully", connection.next);
    } catch (error) {
      console.error(`Error connecting to database: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.log("Already connected to MongoDB");
  }
}

function getModel(collectionName){
  switch(collectionName){
    case "profiles":
      return mongoose.model("Profiles", profileSchema);
    case "users":
      return mongoose.model("Users", usersSchema);
    case "projects":
      return mongoose.model("Projects", projectSchema);
  }
}

async function addItem(collection,doc) {
  const model = getModel(collection)
  try {
    const modelToInsert = new model(doc);
    const result = await modelToInsert.save();
    return result;
  } catch (error) {
    console.error(`Error adding item: ${error.message}`);
    throw error;
  }
}

async function findItems(collection, query = {}) {
  const model = getModel(collection)
  console.log("model", model)
  try {
    const result = await model.find(query);
    console.log("Results:", result);
    return result;
  } catch (error) {
    console.error(`Error finding items: ${error.message}`);
    throw error;
  }
}

async function deleteItemById(collection, id) {
  const model = getModel(collection)
  try {
    const result = await model.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.error(`Error deleting item by id: ${error.message}`);
    throw error;
  }
}

module.exports = {
  init,
  addItem,
  findItems,
  deleteItemById
};
