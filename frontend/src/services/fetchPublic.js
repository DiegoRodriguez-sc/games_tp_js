export const fetchPublic = (endpoint, data, method = "GET", id) => {
    const base = process.env.REACT_APP_BASE_URL || "http://localhost:8080/api";
  
    const url = `${base}${endpoint}/${id || ""}`;
  
    if (method === "GET") {
      return fetch(url);
    } else {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  };