const db = require("../lib/azure-cosmosdb-mongodb");

db.init();

module.exports = async function (context, req) {
  if (!req.body) {
    // Get all employees
    try {
      const employees = await db.searchEmployees({});
      context.res = {
        body: employees,
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      context.log(`Error finding employees: ${error.message}`);
      throw error;
    }
  } else {
    // Find the experts
    const skills = req.body.skills;
    const experts = await findExperts(skills);
    context.res = {
      body: experts,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

async function findExperts(skills) {
  console.log(skills);
  try {
    const regexPatterns = skills.map((skill) => new RegExp(skill, "i"));
    const res = await db.searchEmployees({
      "skills.languages": { $in: regexPatterns },
    });
    return res;
  } catch (error) {
    context.error(`Error generating recipe: ${error.message}`);
    throw error;
  }
}
