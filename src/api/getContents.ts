import axios from 'axios';
import { API_BASE_URL } from '../config';


 export const getContents = async () => {
  try {
    const response = await axios(`${API_BASE_URL}/api/contents`);
    return response.data;
    }
    catch (error) {
        console.error("Error fetching contents:", error);
        return [];
    }
 }