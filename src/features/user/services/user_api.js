import { apiClient } from "../../../services/apiClient.js";

export async function getMe() {
  return apiClient("/users/me");
}

export async function updateProfileApi(data) {
  return apiClient("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
