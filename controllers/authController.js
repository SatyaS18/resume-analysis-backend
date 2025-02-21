const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;

  if (username !== "naval.ravikant" || password !== "05111974") {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ JWT: token });
};

module.exports = { login };
