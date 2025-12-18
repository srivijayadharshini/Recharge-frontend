import API from "../config/api";

export const getAllPlans = () =>
  API.get("/api/plans");

export const getPlansByOperator = (operator) =>
  API.get(`/api/plans/operator/${operator}`);
