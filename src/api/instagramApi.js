export default class instagramApi {
    constructor () {

    }

    getFeed () {
        const url = "https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=IGQWRONW";

        try {
            const respuesta = await fetch(url);
            
            // Verifica si la respuesta es exitosa
            if (!respuesta.ok) {
                throw new Error(`Error al realizar la solicitud: ${respuesta.status}`);
            }
    
            const datos = await respuesta.json();
            console.log('Medios obtenidos:', datos);
    
            return datos; // Puedes hacer lo que quieras con los datos aquí
    
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
        }
    }
}