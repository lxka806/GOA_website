const API_BASE = import.meta.env.VITE_API_URL || "";

const request = async (path, options = {}) => {
  const fetchOptions = {
    credentials: "include",
    method: options.method || "GET",
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  };

  if (options.body !== undefined) {
    if (
      typeof options.body === "object" &&
      options.body !== null &&
      !Array.isArray(options.body) &&
      !(options.body instanceof FormData) &&
      "body" in options.body &&
      "headers" in options.body
    ) {
      fetchOptions.body = options.body.body;
      fetchOptions.headers = {
        ...fetchOptions.headers,
        ...options.body.headers,
      };
    } else {
      fetchOptions.body = options.body;
      if (typeof options.body === "object" && !(options.body instanceof FormData)) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          "Content-Type": "application/json",
        };
        fetchOptions.body = JSON.stringify(options.body);
      }
    }
  }

  const response = await fetch(`${API_BASE}${path}`, fetchOptions);
  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  del: (path) => request(path, { method: "DELETE" }),
};

export const json = (payload) => ({
  body: JSON.stringify(payload),
  headers: { "Content-Type": "application/json" },
});

export const formData = (payload) => ({
  body: payload,
});
