const sql = require("mssql");
const { app } = require("@azure/functions");


app.http("GetProfiles", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "profiles",

  handler: async (request, context) => {
    try {
      await sql.connect(process.env["AZURESQLCONNECTION"]);
      const result = await sql.query("SELECT * FROM dbo.profiles");
      context.log("result ", result)
      context.res = {
        status: 200,
        body: result.recordset,
        headers: {
          "Content-Type": "application/json",
        },
      }
    } catch (err) {
      context.log(err);
      context.res = {
        status: 500,
        body: "Error connecting to database",
      };
    }
    await sql.close();
  },
});
