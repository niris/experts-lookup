const jwt = require("jsonwebtoken");

// Generate a JWT token
function generateToken(payload, expiresIn) {
  // Sign the token with a secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return token;
}

// Verify and decode a JWT token
function verifyToken(token) {
  console.log("Token" , token, " JWT ", process.env.JWT_SECRET)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log("Error verifying token",error);
    return false;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
