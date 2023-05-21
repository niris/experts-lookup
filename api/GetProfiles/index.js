const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = async function (context, req) {
  if (Object.keys(req.params).length == 0) {//Get all users
    // Get all profiles
    try {
      const profiles = await db.findItems("profiles", {});
      context.res = {
        body: profiles,
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      context.log(`Error finding profiles: ${error.message}`);
      throw error;
    }
  } else {// Get users matching the query params
    context.log(req.params);
    const skills = req.query.skills.split(",");
    const profile = await searchProfile(skills);
    context.res = {
      body: profile,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

async function searchProfile(skills) {
  console.log(skills);
  try {
    const regexPatterns = skills.map((skill) => new RegExp(skill, "i"));
    const res = await db.findItems("profiles", {
      "skills.languages": { $in: regexPatterns },
    });
    return res;
  } catch (error) {
    console.error(`Error generating profile: ${error.message}`);
    throw error;
  }
}
