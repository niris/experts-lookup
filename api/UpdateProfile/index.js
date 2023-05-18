const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = async function (context, req) {
const {username, profile} = req.body
console.log("username: ", username,profile)
  try {
      const profileToUpdate = await db.findItems("profiles",{username})
      console.log("profile to update", profileToUpdate)
      const result = await db.updateItemById("profiles",profileToUpdate[0]._id,profile);
      context.res = {
        status: 201,
        body: result
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: { error: 'An error occurred while adding the profile.' }
      };
      context.log.error(error);
    }
  };
