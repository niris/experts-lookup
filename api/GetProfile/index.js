const jwt = require("../lib/jwtUtils");
const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = async function (context, req) {
  const id = req.params.id;

  const authorizationHeader = req.headers.authorization;

  try {
    const profile = await db.findItems("profiles", { userId: id });
    console.log("profile existes", profile);  
    if (profile.length > 0) {
      context.res = {
        status: 200,
        body: { profile},
      };
    } else {
      context.res = {
        status: 200,
        body: { profile :{}},
      };
    }
  } catch (error) {
    console.log("Error:", error);
    context.res = {
      status: 500,
      body: { error: "An error occurred" },
    };
  }
};
