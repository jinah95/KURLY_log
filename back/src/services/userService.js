import { User } from "../db/models/User";

class UserService {
  static async getUsers() {
    const users = await User.findAll();
    if (!users) {
      const errorMessage = "유저가 없습니다.";
      throw new Error(errorMessage);
    }
    return users;
  }
}

export { UserService };
