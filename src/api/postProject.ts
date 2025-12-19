import axios from 'axios';
import { API_BASE_URL } from '../config';


 export const postProjects = async (formData : FormData) => {
  try {
    const response = await axios(`${API_BASE_URL}/api/projects`, {
        method : 'POST',
        headers: {
            // formdata with file upload, no need to set Content-Type
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    });
    return response.data;
    }
    catch (error) {
        console.error("Error posting projects:", error);
        return [];
    }
 }