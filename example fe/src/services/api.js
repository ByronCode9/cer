import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:5000/api";
const baseURL = "http://3.128.184.119:5000/api";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://3.128.184.119:5000/api",
});

export const setTokenInHeader = (token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const userCookie = Cookies.get("user");
console.log("userCookie", userCookie);

// Parse the user object from the cookie
const user = userCookie ? JSON.parse(userCookie) : null;
console.log("user", user);

// Set the authorization header if user and token are available
if (user && user.token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

export default instance;

//********** User APIs **********//

//GET USER
export const getUsers = () => {
  return axios.get(`${baseURL}/user/getall`);
};

//CREATE USER
export const addUser = (userData) => {
  return axios.post(`${baseURL}/user/create`, userData);
};

//GET USER BY ID
export const getUserById = (id) => {
  return axios.get(`${baseURL}/user/oneuser/${id}`);
};

//UPDATE USER
export const updateUser = (userId, updatedUserData) => {
  return axios.put(`${baseURL}/user/oneuser/${userId}`, updatedUserData);
};

//********** Dashboard Data APIs **********//

export const getTokenList = (time, id) => {
  // return instance.get(`/user/get-token-data/${time}`);
  return instance.get(
    `/user/get-token-data${time !== undefined ? `/${time}` : ""}${id !== undefined ? `/${id}` : ""}`
  );
};

//********** Token Auditor APIs **********//

// API GET Status Request
export const getStatusRequest = (id) => {
  return instance.get(`/user/get-token-auditor-status-request/${id}`);
};

// API GET Audit Meta-data
export const getTokenAuditMeta = (id) => {
  return instance.get(`/user/get-token-auditor-status-meta/${id}`);
};

// API GET Audit Meta-data
export const getTokenAuditSecurity = (id) => {
  return instance.get(`/user/get-token-auditor-status-security/${id}`);
};



// API GET Quick Audit Data
export const getTokenQuickAuditData = (id) => {
  return instance.get(`/user/get-token-auditor-status-audit/${id}`);
};

//********** Code Audit APIs **********//
export const getCodeAuditData = (id) => {
  return instance.get(`/user/get-token-auditor-status-code-audit/${id}`);
};

export const getCodeAuditDataByCode = (payload) => {
  return instance.post(`/user/get-token-auditor-status-code-audit-source-code`, payload);
};



//********** Live Data Analytics APIs **********//
export const getLiveAnalyticsData = (id) => {
  return instance.get(`/user/get-token-live-data/${id}`);
};

export const getWalletsData = (id) => {
  return instance.get(`/user/get-wallets-data/${id}`);
};

export const getGasData = () => {
  return instance.get("/user/get-gas-tracker-data");
};

export const getTradesData = (id) => {
  return instance.get(`/user/get-trades-data/${id}`);
};

export const getVolumeDataAnalytics = (id, time) => {
  return instance.get(`/user/get-volume-data`, id, time);
};

export const getAllDatabyToken = (id) => {
  return instance.get(`/user/get-all-data-contract/${id}`);
};

export const getTokenScore = (id) => {
  return instance.get(`/user/get-score-contract/${id}`);
};








