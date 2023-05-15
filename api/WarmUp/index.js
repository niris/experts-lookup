const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = async function (context, req) {
  context.log("Warm-up request received.");
  
  db.init()
  .then(() => {
    console.log("Database connection initialized!");
  })
  .catch((error) => {
    console.error("Error initializing database connection:", error);
  });

  context.log("Warm-up completed successfully.");
  context.res = {
    status: 200,
    body: "Warm-up completed successfully.",
  };
};
