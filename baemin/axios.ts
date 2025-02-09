import axios from "axios";

export const BASE_URL = "http://localhost:8080";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

type SignupInfo = {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
};

type LoginInfo = {
  loginInfo: string;
  password: string;
};

export const signup = async (signupInfo: SignupInfo) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/signup`,
    signupInfo
  );

  return data;
};

export const login = async (loginInfo: LoginInfo) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/login`,
    loginInfo
  );

  return data;
};

export const getFoodCategoryList = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/food/food-category`);

  return data;
};

export const fetchFoodList = async (foodQuery: {
  page?: number;
  size?: number;
  categoryId?: number;
}) => {
  const { page = 1, size = 12, categoryId = 1 } = foodQuery;

  const { data } = await axiosInstance.get(
    `${BASE_URL}/food?page=${page}&size=${size}&categoryId=${categoryId}`
  );

  return data;
};
