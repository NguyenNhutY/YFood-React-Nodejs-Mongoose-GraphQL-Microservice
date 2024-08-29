import fs from "fs";

// Function to generate a random string of a given length
const generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Function to create a list of promo codes
const generatePromoCodes = (count) => {
  const promoCodes = [];
  for (let i = 0; i < count; i++) {
    const code = generateRandomString(10); // 10-character long promo code
    const discount = Math.random() < 0.5 ? 0.1 : 0.2; // 10% or 20% discount
    const expiryDate = new Date(
      Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000
    ); // Random expiry date within a year
    promoCodes.push({
      code,
      discount,
      description: `Discount of ${discount * 100}%`,
      expiryDate: expiryDate.toISOString(),
    });
  }
  return promoCodes;
};

// Generate 300 promo codes
const promoCodes = generatePromoCodes(300);

// Save to a file (optional)
fs.writeFileSync("promoCodes.json", JSON.stringify(promoCodes, null, 2));

console.log("Generated 300 promo codes");
