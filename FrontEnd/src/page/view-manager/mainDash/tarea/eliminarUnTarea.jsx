import axios from 'axios';
import Cookies from 'js-cookie';

export const deleteTask = async (Nombre) => {
  try {
    const token = Cookies.get('token');
    const response = await axios.delete(`http://localhost:666/api/task/${Nombre}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    return { resultado: 'Error al eliminar tarea' };
  }
};
