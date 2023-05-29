// apiService.ts

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  const data = await response.json();
  return data;
};
