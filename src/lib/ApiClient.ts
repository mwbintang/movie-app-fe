import { envData } from "../constants/envData";

async function ApiClient<T>(url: string, method: string = 'GET'): Promise<T> {
  const config: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${envData.REACT_APP_API_URL}${url}`, config);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default ApiClient;