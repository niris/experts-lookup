const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = async function (context, req) {

  context.log("params : ", req.query)
  if (Object.keys(req.query).length==0) { // Get all profiles
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
    const skills = req.query.skills.split(",");
    console.log("skills: ", skills);
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
  console.log("skills: ", skills);

  try {
    const regexPatterns = skills.map((skill) => new RegExp(skill, "i"));
    const res = await db.findItems("profiles", 
    {
      $or: [
        { "skills.languages": { $in: regexPatterns } },
        { "skills.concepts": { $in: regexPatterns } },
        { "skills.tools": { $in: regexPatterns } },
      ],
    },{ score: { $meta: "textScore" } });
    console.log("res ", res)
    return res;
  } catch (error) {
    console.error(`Error generating profile: ${error.message}`);
    throw error;
  }
}
