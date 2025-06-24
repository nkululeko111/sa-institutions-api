import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Spring Boot backend

export const useApi = () => {
  const getInstitutions = async (province?: string, type?: string) => {
    // Clean filters: ignore empty strings or whitespace
    const hasProvince = province && province.trim() !== '';
    const hasType = type && type.trim() !== '';

    try {
      if (!hasProvince && !hasType) {
        // No filters: fetch all institutions
        console.log('🌐 Request: GET /institutions (no filters)');
        const response = await axios.get(`${API_BASE_URL}/institutions`);
        console.log('✅ Response:', response.data);
        return response.data;
      } else {
        // Filters applied: fetch filtered institutions
        const params: Record<string, string> = {};
        if (hasProvince) params.province = province!.trim();
        if (hasType) params.type = type!.trim();

        console.log('🌐 Request: GET /institutions/search with params', params);
        const response = await axios.get(`${API_BASE_URL}/institutions/search`, { params });
        console.log('✅ Response:', response.data);
        return response.data;
      }
    } catch (error) {
      console.error('❌ API Error:', error);
      // Return empty paginated response fallback
      return {
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: 10,
        number: 0,
      };
    }
  };

  return { getInstitutions };
};
