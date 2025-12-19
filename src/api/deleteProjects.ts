import axios from 'axios';
import { API_BASE_URL } from '../config';


 export const deleteProjects = async (id:string) => {
  try {
    const response = await axios(`${API_BASE_URL}/api/projects?id=${id}`, {
        method : 'DELETE',
    });
    return response.data;
    }
    catch (error) {
        console.error("Error deleting projects:", error);
        return [];
    }
 }