import API from "../config/api";

export const doRecharge = (data) =>
  API.post("/api/recharge", data);

export const getRechargeHistory = () =>
  API.get("/api/recharge/history");
