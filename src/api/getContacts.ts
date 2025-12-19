import axios from 'axios';
import { API_BASE_URL } from '../config';


 export const getContacts = async () => {
  try {
    const response = await axios(`${API_BASE_URL}/api/contact`);
    return response.data;
    }
    catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
    }
 }