const jwt = require ("../lib/jwtUtils");
const db = require("../lib/azure-cosmosdb-mongodb");
const bcrypt = require("bcrypt")

module.exports = async function (context, req) {
  const { username, password } = req.body;

  // Validate the username and password
  if (!username || !password) {
    context.res = {
      status: 400,
      body: "Username and password are required.",
    };
    return;
  }

  // Check if the username and password are correct
  const isValidCredentials = await validateCredentials(username, password);

  if (!isValidCredentials) {
    context.res = {
      status: 401,
      body: "Incorrect username or password.",
    };
    return;
  }

  const payload = { userId: username, role: "admin" };
  const expirationTime = "24h";

  const token = jwt.generateToken(payload, expirationTime);

  context.res = {
    status: 200,
    body: {
      token: token,
    },
  };
};

async function validateCredentials(username, password) {
  try {
    const user = await db.findItem("profiles",{ username: username });

    if (!user) {
      console.log( "Username doesn't exist")
      return false;
    }

    console.log("User " , user)
    const isPasswordValid = await bcrypt.compare(password, user.password);
     console.log(password, user.password, " is password valid", isPasswordValid)
    if (isPasswordValid) {
      console.log("Valid credientials")
      return true;
    } else {
      console.log("InValid credientials")
      return false;
    }
  } catch (error) {
    console.log("Error validating credentials:", error);
    return false;
  }
}
