import axios from "axios";

export default function useImagica() {
    const API = import.meta.env.VITE_IMAGICA_API;

    /**
     * Validate a token with the Imagica API.
     * 
     * @param {string} token The token to validate.
     * @returns {Promise<object>} A promise that resolves with the user's data
     *                           if the token is valid, or rejects with an error.
     * @throws {Error} If the request fails or the token is invalid.
     */
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

    /**
     * Sube una imagen a Imagica con el token especificado.
     * 
     * @param {{ image: File, token: string }} options
     * @param {File} options.image La imagen a subir.
     * @param {string} options.token El token de autenticación.
     * @returns {Promise<Photo>} Promesa que se resuelve con el objeto de la
     *                           foto subida.
     * @throws {Error} Si ocurre un error al subir la imagen.
     */
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

    /**
     * Obtener las fotos subidas por el usuario con el token especificado.
     *
     * @param {string} token Token de autenticación.
     * @returns {Promise<Photo[]>} Promesa que se resuelve con un array de objetos
     *                           que representan las fotos subidas.
     * @throws {Error} Si ocurre un error al obtener las fotos.
     */
    async function getUploadedPhotos(token) {
        try {
            const response = await axios.get(`${API}/photos`, {
                params: {
                    token
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting uploaded photos:', error);
            throw error;
        }
    }

    async function deletePhoto(token, photoId) {
        try {
            const response = await axios.delete(`${API}/delete-photo/${photoId}?token=${token}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting photo:', error);
            throw error;
        }
    }

    return {
        validateToken,
        uploadImage,
        getUploadedPhotos,
        deletePhoto
    }
}