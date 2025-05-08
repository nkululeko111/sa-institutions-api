import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Spring Boot backend

export const useApi = () => {
  const getInstitutions = async (province?: string, type?: string) => {
    const response = await axios.get(`${API_BASE_URL}/institutions/search`, {
      params: { province, type },
    });
    return response.data;
  };

  return { getInstitutions };
};