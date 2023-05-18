const db = require("../lib/azure-cosmosdb-mongodb");
const bcrypt = require("bcrypt")

module.exports = async function (context, req) {
  const { username, password } = req.body;

  try {
    // Check if the user with the provided username already exists in the database
    const existingUser = await db.findItems("users", { username: username });

    if (existingUser.lenght > 0) {
      console.log("User exist")
      return {
        status: 400,
        body: { success: false, message: "Username already exists" },
      };
    }

    // Hash the password using bcrypt before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the username and hashed password
    const newUser = {
      username: username,
      password: hashedPassword,
    };

    // Save the new user in the database
    const addresult = await db.addItem("users", newUser);
    console.log("add result", addresult)

    return {
      status: 201,
      body: { success: true, message: "User created successfully" },
    };
  } catch (error) {
    // Handle any errors that occur during the signup process
    context.log.error("Error creating user:", error);
    return {
      status: 500,
      body: { success: false, message: "Error creating user" },
    };
  }
};
