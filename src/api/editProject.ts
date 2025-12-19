import axios from 'axios';
import { API_BASE_URL } from '../config';


 export const editProjects = async (body :any) => {
  try {
    const response = await axios(`${API_BASE_URL}/api/projects`, {
        method : 'PUT',
        headers: {
            // formdata with file upload, no need to set Content-Type
            'Content-Type': 'application/json'
        },
        data: body
    });
    return response.data;
    }
    catch (error) {
        console.error("Error editing projects:", error);
        return [];
    }
 }