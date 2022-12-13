// external imports
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// types
import { IUser } from "./interfaces/user";

interface IMockApiUser {
  users: Array<{
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    image: string;
  }>;
}

export const getMockApiUsersData = async (): Promise<IUser[]> => {
  try {
    const request = await axios.get("https://dummyjson.com/users?limit=100");
    const data = request.data as IMockApiUser;

    return data.users.map<IUser>((user, index) => ({
      id: (index + 1),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatar: user.image,
      username: user.username,
    }));
  } catch (error) {
    console.error("..... Error Fetching Dummy Data .....", error);
    return [];
  }
};
