const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message || "API request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function getErrorMessage(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = await response.json();
    return data.message;
  }

  return response.text();
}

export function getVehicles() {
  return request("/cars");
}

export function createVehicle(vehicle) {
  return request("/cars", {
    method: "POST",
    body: JSON.stringify(vehicle),
  });
}

export function updateVehicle(id, vehicle) {
  return request(`/cars/${id}`, {
    method: "PUT",
    body: JSON.stringify(vehicle),
  });
}

export function deleteVehicle(id) {
  return request(`/cars/${id}`, {
    method: "DELETE",
  });
}
