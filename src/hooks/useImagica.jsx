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

    return {
        validateToken
    }
}