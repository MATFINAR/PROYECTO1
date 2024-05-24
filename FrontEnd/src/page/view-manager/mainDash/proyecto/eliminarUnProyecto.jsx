import axios from 'axios';
import Cookies from "js-cookie"

export const deleteProyect = async (Nombre) => {
  try {
    const token = Cookies.get('token');
    const response = await axios.delete(`http://localhost:666/api/project/${Nombre}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    return { resultado: 'Error al eliminar proyecto' };
  }
};
