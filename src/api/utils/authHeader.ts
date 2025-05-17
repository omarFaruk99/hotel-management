import { getToken } from "../config/apiConfig";

export const getAuthHeader = () => {
  const token = getToken();
  return {
    Authorization: `bearer ${token}`,
  };
};
