const jwt = require("../lib/jwtUtils");
const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = async function (context, req) {
  const id = req.params.id;
  console.log(id)
  try {
    const profile = await db.findItems("profiles", { username: id });
    console.log("profile", profile);    
    context.res = {
      status: 200,
      body: { profile },
    };
  } catch (error) {
    console.log("Error:", error);
    context.res = {
      status: 500,
      body: { error: "An error occurred" },
    };
  }
};
