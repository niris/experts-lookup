const db = require("../lib/azure-cosmosdb-mongodb");
const bcrypt = require("bcrypt")

module.exports = async function (context, req) {
  const { username, password } = req.body;

  try {
    // Check if the user with the provided username already exists in the database
    const existingUser = await db.findItems("profiles", { username: username });

    if (existingUser.length) {
      context.res = {
        status: 409,
        body: { success: false, message: "Username already exists" },
      };
      return;
    }

    // Hash the password using bcrypt before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
    };

    // Save the new user in the database
    const addresult = await db.addItem("profiles", newUser);

    context.res = {
      status: 200,
      body: { success: true, message: "User created successfully" },
    };   
  } catch (error) {
    context.log.error("Error creating user:", error);    
    context.res = {
      status: 500,
      body: { success: false, message: `Error creating user: ${error}` },
    };
  }
};
