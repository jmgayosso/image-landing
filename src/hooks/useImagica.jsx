import axios from "axios";

export default function useImagica() {
    const API = import.meta.env.VITE_IMAGICA_API;
    async function validateToken(token) {
        try {
            const response = await axios.post(`${API}/validate-token`, {
                token
            });
            return response.data;
        } catch (error) {
            console.error('Error validating token:', error);
            throw error;
        }
    }
    async function uploadImage({ image, token }) {
        try {
            console.log('Enviando imagen...', { token, image });

            // Crear un objeto FormData para manejar multipart/form-data
            const formData = new FormData();
            formData.append('token', token);  // Añade el token
            formData.append('photo', image);  // Añade la imagen
    
            // Realizar la petición
            const response = await axios.post(`${API}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Establecer el tipo de contenido
                },
            });
            
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
    

    return {
        validateToken,
        uploadImage
    }
}