import axios from "@/lib/axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/api/users?all");
    return res.data;
  } catch (error) {
    console.error(error.response);
    return null;
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get("/api/user");
    return res;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};
