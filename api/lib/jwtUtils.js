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
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token is valid")
    return decoded;
  } catch (error) {
    // Token is invalid or has expired
    console.log("Error verifying token",error);
    return null;
  }
}


module.exports = {
  generateToken,
  verifyToken
};
