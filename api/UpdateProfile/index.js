const db = require("../lib/azure-cosmosdb-mongodb");
const jwt = require("../lib/jwtUtils");
module.exports = async function (context, req) {
  const { profile } = req.body;
  const authorizationToken = req.headers.authorization;

  const decodedToken = jwt.verifyToken(authorizationToken.slice(7));
  if (decodedToken) {
    try {
      const profileToUpdate = await db.findItem("profiles", {
        username: profile.username,
      });
      const result = await db.updateItemById(
        "profiles",
        profileToUpdate._id,
        profile
      );
      result.password = undefined;
      context.res = {
        status: 201,
        body: result,
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: { error: "An error occurred while adding the profile." },
      };
    }
  } else {
    context.res = {
      status: 401,
      body: "Invalid authorization token",
    };
  }
};
