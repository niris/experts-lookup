const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    skills: {
      concepts: [{ type: String }],
      languages: [{ type: String }],
      tools: [{ type: String }],
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  });

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    environment: [{ type: String }],
});


const employeeModel = mongoose.model("Employees", employeeSchema);

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

async function addEmployee(doc) {
  try {
    const modelToInsert = new employeeModel(doc);
    const result = await modelToInsert.save();
    return result;
  } catch (error) {
    console.error(`Error finding item by id: ${error.message}`);
    throw error;
  }
}

async function searchEmployees(query = {}) {
  try {
    const employees = await employeeModel.find(query);
    console.log("Results:", employees);
    return employees;
  } catch (error) {
    console.error(`Error finding items: ${error.message}`);
    throw error;
  }
}

async function deleteEmployeeById(id) {
  try {
    const result = await employeeModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.error(`Error deleting item by id: ${error.message}`);
    throw error;
  }
}

const projectModel = mongoose.model("Projects", projectSchema);

async function addProject(doc) {
    try {
      const modelToInsert = new projectModel(doc);
      const result = await modelToInsert.save();
      return result;
    } catch (error) {
      console.error(`Error finding item by id: ${error.message}`);
      throw error;
    }
  }

async function searchProjects(query = {}) {
    try {
      const projects = await projectModel.find(query);
      console.log("Results:", projects);
      return projects;
    } catch (error) {
      console.error(`Error finding items: ${error.message}`);
      throw error;
    }
  }

  
module.exports = {
  init,
  addEmployee,
  searchEmployees,
  deleteEmployeeById,
  addProject,
  searchProjects
};
