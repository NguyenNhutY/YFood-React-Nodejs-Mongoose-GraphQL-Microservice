import UserFinderFactory from "../creational/user.finder.factory.js";
import Account from "../account.model.js";

class UserCheckEmail {
  static async checkEmail(email) {
    const existingUser = await Account.findOne({ email: email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
  }
}

export default UserCheckEmail;
