import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Camera, AlertCircle } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from './assets/animations/Animation - 1729664229969.json'; // Asegúrate de tener este archivo
import useImagica from './hooks/useImagica';
import ejemplo1 from './assets/ejemplo1.jpg';
import ejemplo2 from './assets/ejemplo2.jpg';
import ejemplo3 from './assets/ejemplo3.jpg';
import ejemplo4 from './assets/ejemplo4.jpg';
import ejemplo5 from './assets/ejemplo5.jpg';
import ejemplo6 from './assets/ejemplo6.jpg';
import ejemplo7 from './assets/ejemplo7.jpg';
import idea8 from './assets/idea8.jpg';
import idea9 from './assets/idea9.jpg';
import idea10 from './assets/idea10.jpg';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify'; // Importa el ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos

// Simulated themes for image generation
const themes = [
  { id: 1, name: 'Magnate', image: ejemplo1 },
  { id: 10, name: 'Fiester', image: idea10 },
  { id: 3, name: 'Jinete', image: ejemplo3 },
  { id: 2, name: 'Princesa', image: ejemplo2 },
  { id: 9, name: 'Sireno', image: idea9 },
  { id: 5, name: 'Dios Griego', image: ejemplo5 },
  { id: 6, name: 'Telettubbie', image: ejemplo6 },
  { id: 8, name: 'Terminator', image: idea8 },
  { id: 7, name: 'Soldado Romano', image: ejemplo7 },
];

export default function ImageUpload() {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [imagicaData, setImagicaData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imagicaError, setImagicaError] = useState();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const { validateToken, uploadImage, getUploadedPhotos } = useImagica();


  async function fetchPhotosByToken(token) {
    try {
      const response = await getUploadedPhotos(token);
      console.log('Fetched uploaded photos:', response.photos);
      const uploadedPhotos = response.photos.map((photo) => ({
        id: photo.id,
        file: null,
        preview: photo.file_url, // Usamos la URL de la foto subida previamente
        uploadProgress: 100, // Marcamos las fotos cargadas como completadas
        status: 'uploaded',
      }));
      setImages((prevImages) => [...uploadedPhotos, ...prevImages]); // Mostramos las fotos cargadas junto a las nuevas
    } catch (error) {
      console.error('Error fetching uploaded photos:', error);
    }
  }

  useEffect(() => {
    console.log('Mounted Page:', token);
    if (!token) {
      navigate('/');
    }
    let isMounted = true; 

    const fetchImagicaData = async () => {
      try {
        setIsLoading(true);
        const data = await validateToken(token);
        setImagicaData(data);
        //Problema con strict mode: si strict mode esta habilitado agrega dos veces las imagenes
        if (isMounted) {
          await fetchPhotosByToken(token);
        }
      } catch (error) {
        setImagicaError(error.response);
        console.error('Error fetching Imagica data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagicaData();

    return () => {
      isMounted = false;
    }
  }, [token, navigate]);

  // Manejo de subida de imágenes
  const handleImageUpload = useCallback(async (image) => {
    try {
      await uploadImage({ image: image.file, token });

      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === image.id ? { ...img, status: 'uploaded', uploadProgress: 100 } : img
        )
      );
      toast.success(`Imagen ${image.file.name} subida con éxito!`); // Notificación de éxito
    } catch (error) {
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === image.id ? { ...img, status: 'error' } : img
        )
      );
      const errorMessage = error.response?.data?.details || error.response?.data?.error|| error.message || error;
      toast.error(`Error al subir la imagen ${image.file.name}: ${errorMessage}`); // Notificación de error
      console.error('Error al subir la imagen:', error);
    }
  }, [uploadImage]);

  // Se ejecuta cuando se añade una nueva imagen
  useEffect(() => {
    images.forEach((image) => {
      if (image.status === 'uploading') {
        handleImageUpload(image);
      }
    });
  }, [images, handleImageUpload]);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7),
      uploadProgress: 20,
      status: 'uploading',
    }));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 10));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  const removeImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const retryUpload = (image) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === image.id ? { ...img, status: 'uploading', uploadProgress: 0 } : img
      )
    );
  };

  const handleSubmit = async () => {
    if (images.length < 6) {
      alert('Por favor, sube al menos 6 imágenes.');
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setImages([]);
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-yellow-100 via-orange-200 to-pink-200 font-sans">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">Procesando tus fotos</h2>
            <p className="text-xl text-purple-600">Pronto las recibirás por correo electrónico</p>
          </div>
        </main>
      </div>
    );
  }

  if (imagicaError) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-yellow-100 via-orange-200 to-pink-200 font-sans">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">Error al validar tu token</h2>
            <p className="text-xl text-purple-600">{imagicaError?.data.error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
          <div className="relative z-10 w-64 h-64">
            <Lottie
              animationData={loadingAnimation}
              loop
              autoplay
            />
            <p className="text-center text-purple-800 text-xl font-semibold mt-4">
              Por favor espera...
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-yellow-100 via-orange-200 to-pink-200 font-sans">
        <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-orange-400 to-pink-400">
          <a className="flex items-center justify-center" href="#">
            <Camera className="h-6 w-6 text-yellow-200" />
            <span className="ml-2 text-2xl font-bold text-yellow-200">Imagica.lol</span>
          </a>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">¡Bienvenido, {imagicaData?.upload_info?.user?.name}!</h1>
            <p className="text-lg text-purple-600 mb-6">
              Este es tu enlace personal para subir imágenes. Por favor, no compartas este enlace con nadie más.
            </p>
            <p className="text-md text-purple-700 mb-8">
              Sube tus imágenes para entrenar el modelo y generar tus nuevas y divertidas fotos. Necesitamos un mínimo de 6 imágenes y un máximo de 10.
            </p>

            <div
              {...getRootProps()}
              className={`w-full h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
                isDragActive ? 'border-purple-600 bg-purple-100' : 'border-purple-300 bg-purple-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-10 w-10 text-purple-500 mb-4" />
              <p className="text-purple-600 text-lg">Arrastra y suelta tus imágenes aquí, o haz clic para seleccionarlas</p>
              <p className="text-purple-500 text-sm">Hasta 10 imágenes. El tamaño máximo es de 2MB.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  {image.status === 'uploading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="bg-white rounded-full p-2">
                        <span className="text-purple-500 font-bold">
                          {image.uploadProgress}%
                        </span>
                      </div>
                    </div>
                  )}
                  {image.status === 'error' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/75">
                      <AlertCircle className="h-10 w-10 text-white" />
                      <button
                        type="button"
                        onClick={() => retryUpload(image)}
                        className="absolute bottom-2 left-2 bg-yellow-500 text-white p-1 rounded-lg"
                      >
                        Reintentar
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Elige un tema</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme.name)}
                    className={`p-4 bg-white border-2 ${
                      selectedTheme === theme.name ? 'border-purple-600' : 'border-transparent'
                    } rounded-lg shadow-md text-purple-600 text-center transition-all hover:shadow-lg`}
                  >
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <span className="font-semibold">{theme.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={customTheme}
                  onChange={(e) => setCustomTheme(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg shadow-md border-2 border-purple-300 focus:outline-none focus:border-purple-500"
                  placeholder="Escribe tu propio tema personalizado"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSubmit}
                disabled={images.length < 6 || isProcessing}
                className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Procesando...' : 'Enviar imágenes'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
