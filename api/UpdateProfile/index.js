const db = require("../lib/azure-cosmosdb-mongodb");
const jwt = require("../lib/jwtUtils");
module.exports = async function (context, req) {
  const {profile} = req.body;
  const authorizationToken = req.headers.authorization;

  try {
    const decodedToken = jwt.verifyToken(authorizationToken);
    if (decodedToken) {
      try {
        const profileToUpdate = await db.findItem("profiles", { username:profile.username});
        const result = await db.updateItemById(
          "profiles",
          profileToUpdate._id,
          profile
        );
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
    }
  } catch (error) {
    context.res = {
      status: 401,
      body: "Invalid authorization token",
    };
  }
};
