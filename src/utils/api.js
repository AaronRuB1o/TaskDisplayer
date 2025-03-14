const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

/**
 * Reusable function for API calls
 * @param {string} endpoint - API route (e.g., "/api/task")
 * @param {object} [options={}] - Fetch options (method, headers, body)
 * @returns {Promise<any>}
 */
export async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Convert response to JSON
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error; // Re-throw error for handling in components
  }
}
