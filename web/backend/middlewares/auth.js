import jwt from "jsonwebtoken";
const tokenAdmin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzlkYzBkNTg0MTFjNWRmMWRiODMzMiIsImlhdCI6MTcyNDU2OTk4NSwiZXhwIjoxNzI0NTczNTg1LCJzdWIiOiJVc2VyIFJlZ2lzdHJhdGlvbiJ9.KAvVlkyz1JALq-7mAiurVO56WKm2Fk0vEhkEiQPcfl8";
const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  console.log(req.headers);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authenticated" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    console.log(
      "User ID when auth",
      req.body.userId,
      "Decode Id when auth",
      token_decode.id
    );
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
