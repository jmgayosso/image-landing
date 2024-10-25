import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, Camera, AlertCircle, CheckCircle, Plus } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import loadingAnimation from './assets/animations/Animation - loading.json'
import uploadingAnimation from './assets/animations/Animation - uploading files.json'
import successAnimation from './assets/animations/Animation - success.json'
import useImagica from './hooks/useImagica'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'

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

const themes = [
  { id: 1, name: 'Magnate', image: ejemplo1 },
  { id: 2, name: 'Fiester@', image: idea10 },
  { id: 3, name: 'Jinete', image: ejemplo3 },
  { id: 4, name: 'Princesa', image: ejemplo2 },
  { id: 5, name: 'Siren@', image: idea9 },
  { id: 6, name: 'Dios Griego', image: ejemplo5 },
  { id: 7, name: 'Telettubbie', image: ejemplo6 },
  { id: 8, name: 'Terminator', image: idea8 },
  { id: 9, name: 'Soldado Romano', image: ejemplo7 },
  { id: 10, name: 'Superhéroe', image: ejemplo4 },
];

export default function ImageUpload() {
  const [images, setImages] = useState([]);
  const [orderStatus, setOrderStatus] = useState('loading');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [customThemes, setCustomThemes] = useState([]);
  const [customThemeInput, setCustomThemeInput] = useState('');
  const [imagicaData, setImagicaData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imagicaError, setImagicaError] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(new Set());

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const { validateToken, uploadImage, getUploadedPhotos, deletePhoto, completeUpload } = useImagica();

  const isButtonDisabled = images.length < 6 || orderStatus !== 'pending' || (selectedThemes.length + customThemes.length) !== 10;
  const finalThemes = [...selectedThemes, ...customThemes].join(', ');

  async function fetchPhotosByToken(token) {
    try {
      const response = await getUploadedPhotos(token);
      const uploadedPhotos = response.photos.map(photo => ({
        id: photo.id,
        photoId: photo.id,
        file: null,
        preview: photo.file_url,
        uploadProgress: 100,
        status: 'uploaded',
      }));
      setImages(prevImages => [...uploadedPhotos, ...prevImages]);
    } catch (error) {
      console.error('Error fetching uploaded photos:', error);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    let isMounted = true;

    const fetchImagicaData = async () => {
      try {
        setIsLoading(true);
        const data = await validateToken(token);
        setImagicaData(data);
        if (isMounted) {
          await fetchPhotosByToken(token);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || error.response?.data?.details || error.message || error;
        if (errorMessage === 'Token has already been used') {
          setOrderStatus('completed');
          return;
        }
        setImagicaError(error.response);
        console.error('Error fetching Imagica data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagicaData();

    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  useEffect(() => {
    if (imagicaData) {
      console.log(imagicaData);
      setOrderStatus(imagicaData.upload_info.upload_status);
    }
  }, [imagicaData]);

  const handleImageUpload = useCallback(
    async (image) => {
      if (uploadingImages.has(image.id)) {
        return; // Already uploading
      }
      uploadingImages.add(image.id); // Add to uploading set

      try {
        const { photoId } = await uploadImage({ image: image.file, token });
        setImages((prevImages) =>
          prevImages.map((img) => (img.id === image.id ? { ...img, status: 'uploaded', uploadProgress: 100, photoId } : img))
        );
        toast.success(`Imagen ${image.file.name} subida con éxito!`);
      } catch (error) {
        setImages((prevImages) =>
          prevImages.map((img) => (img.id === image.id ? { ...img, status: 'error' } : img))
        );
        const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message || error;
        toast.error(`Error al subir la imagen ${image.file.name}: ${errorMessage}`);
        console.error('Error al subir la imagen:', error);
      } finally {
        uploadingImages.delete(image.id); // Remove from uploading set
      }
    },
    [uploadImage, token]
  );

  useEffect(() => {
    images.forEach((image) => {
      if (image.status === 'uploading') {
        handleImageUpload(image);
      }
    });
  }, [images, handleImageUpload]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    rejectedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.file.name} es demasiado grande. El tamaño máximo es 5MB.`);
      } else {
        toast.error(`${file.file.name} no es un tipo de archivo permitido.`);
      }
    });

    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7),
      uploadProgress: 30,
      status: 'uploading',
    }));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 10));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 5 * 1024 * 1024,
  });

  const removeImage = async (id) => {
    try {
      const { photoId } = images.find((img) => img.id === id);
      setIsLoading(true);
      await deletePhoto(token, photoId);
      setImages((prevImages) => prevImages.filter((image) => image.id !== id));
      toast.success('Imagen eliminada con exito!');
    } catch (error) {
      const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message || error;
      toast.error(`Error al borrar la imagen: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const retryUpload = (image) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === image.id ? { ...img, status: 'uploading', uploadProgress: 0 } : img))
    );
  };

  const handleSubmit = async () => {
    if (images.length < 6) {
      toast.error('Por favor, sube al menos 6 imágenes.');
      return;
    }
    if (selectedThemes.length + customThemes.length !== 10) {
      toast.error('Por favor, selecciona exactamente 10 temáticas en total.');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    try {
      setIsLoading(true);
      setShowConfirmModal(false);
      await completeUpload(token, finalThemes);
      setShowSuccessModal(true);
    } catch (e) {
      console.error('Error al completar el proceso de subida:', e);
      const errorMessage = e.response?.data?.details || e.response?.data?.message || e.response?.data?.error || e.message || e;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = (themeName) => {
    setSelectedThemes(prev => {
      if (prev.includes(themeName)) {
        return prev.filter(t => t !== themeName);
      } else if (prev.length + customThemes.length < 10) {
        return [...prev, themeName];
      }
      return prev;
    });
  };

  const addCustomTheme = () => {
    if (customThemeInput.trim() && selectedThemes.length + customThemes.length < 10) {
      setCustomThemes(prev => [...prev, customThemeInput.trim()]);
      setCustomThemeInput('');
    }
  };

  const removeCustomTheme = (theme) => {
    setCustomThemes(prev => prev.filter(t => t !== theme));
  };

  if (orderStatus === 'completed') {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-100 via-orange-200 to-pink-200 font-sans">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">Tus nuevas y divertidas fotos están en proceso</h2>
            <p className="text-xl text-purple-600 mb-4">
              Hemos recibido tus fotos y el equipo de Imagica está trabajando en ellas. Pronto las recibirás en tu correo electrónico.
            </p>
            <p className="text-lg text-purple-500">
              Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:soporte@imagica.com" className="underline">soporte@imagica.com</a>.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (imagicaError) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-100 via-orange-200 to-pink-200 font-sans">
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
            <Lottie animationData={loadingAnimation} loop autoplay />
            <p className="text-center text-purple-800 text-xl font-semibold mt-4">
              Por favor espera...
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-100 via-orange-200 to-pink-200 font-sans">
        <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-orange-400 to-pink-400">
          <a className="flex items-center justify-center" href="#">
            <Camera className="h-6 w-6 text-yellow-200" />
            <span className="ml-2 text-2xl font-bold text-yellow-200">Imagica.lol</span>
          </a>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">
            ¡Bienvenid@, {imagicaData?.upload_info?.user?.name}!
          </h1>
          <p className="text-lg text-purple-600 mb-6">
            Este es tu enlace personal para subir imágenes. Por favor, no compartas este enlace
            con nadie más.
          </p>
          <p className="text-md text-purple-700 mb-8">
            Sube tus imágenes para entrenar el modelo y generar tus nuevas y divertidas fotos.
            Necesitamos un mínimo de 6 imágenes y un máximo de 10. 
            Es importante que las imágenes sean de buena calidad y que muestren tu cara desde distintos ángulos, 
            preferiblemente sin accesorios.
          </p>

            <div
              {...getRootProps()}
              className={`w-full h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
                isDragActive ? 'border-purple-600 bg-purple-100' : 'border-purple-300 bg-purple-50'
              }`}
            >
              
              <input {...getInputProps()} />
              <Upload className="h-10 w-10 text-purple-500 mb-4" />
              <p className="text-purple-600 text-lg">
                Arrastra y suelta tus imágenes aquí, o haz clic para seleccionarlas
              </p>
              <p className="text-purple-500 text-sm">Hasta 10 imágenes. El tamaño máximo es de 5MB por imagen.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4 mt-6">
              {images.map((image) => (
                <div key={image.id} className={`relative group ${image.status === 'uploading' ? 'ring-4 ring-purple-300 rounded-lg' : ''}`}>
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-60 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
                  />
                  {(image.status === 'uploading' || image.status === 'loading') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
                      <Lottie animationData={uploadingAnimation} loop autoplay style={{ width: 80, height: 80 }} />
                    </div>
                  )}
                  {image.status === 'uploading' && (
                    <div className="absolute inset-x-0 bottom-0 h-2 bg-gray-200 rounded-b-lg overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all duration-300 ease-out"
                        style={{ width: `${image.uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                  {image.status === 'error' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/75 rounded-lg">
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
                  {image.status === 'uploaded' && (
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Subida
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

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Selecciona 10 temáticas para generar tus nuevas fotos.</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    layoutId={`theme-${theme.id}`}
                    onClick={() => toggleTheme(theme.name)}
                    className={`p-4 bg-white border-2 ${
                      selectedThemes.includes(theme.name)
                        ? 'border-purple-600 ring-4 ring-purple-200'
                        : 'border-transparent'
                    } rounded-lg shadow-md text-purple-600 text-center transition-all hover:shadow-lg relative`}
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: selectedThemes.includes(theme.name) ? 1.05 : 1 }}
                  >
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <span className="font-semibold">{theme.name}</span>
                    {selectedThemes.includes(theme.name) && (
                      <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {customThemes.map((theme, index) => (
                    <div key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center">
                      <span>{theme}</span>
                      <button
                        onClick={() => removeCustomTheme(theme)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={customThemeInput}
                    onChange={(e) => setCustomThemeInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomTheme();
                      }
                    }}
                    className="flex-grow px-4 py-2 rounded-l-lg shadow-md border-2 border-purple-300 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Escribe tu propia temática personalizada"
                  />
                  <button
                    onClick={addCustomTheme}
                    disabled={selectedThemes.length + customThemes.length >= 10}
                    className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300"
                  >
                    <Plus className="h-7 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-purple-600 font-semibold">
                  {selectedThemes.length + customThemes.length}/10 temáticas seleccionadas
                </p>
              </div>
            </div>

            <div className="mt-6 relative group">
            <button
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md 
                ${isButtonDisabled ? 'bg-purple-400 cursor-not-allowed opacity-50' : 'bg-purple-600 hover:bg-purple-700'}
                transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
            >
              {orderStatus !== 'pending' ? orderStatus : 'Enviar imágenes'}
            </button>


              {isButtonDisabled && (
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  Sube al menos 6 imágenes y selecciona 10 temáticas en total.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirmar envío de imágenes</h3>
            <p className="mb-4">Estás a punto de enviar <span className="font-semibold">{images.length}</span> imágenes con las siguientes temáticas:</p>
            <ul className="mb-6 list-disc list-inside">
              {selectedThemes.map((theme, index) => (
                <li key={index}>{theme}</li>
              ))}
              {customThemes.map((theme, index) => (
                <li key={`custom-${index}`}>{theme}</li>
              ))}
            </ul>
            <p className="mb-6">¿Estás seguro de que deseas continuar?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Regresar
              </button>
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
            <h3 className="text-lg font-semibold mb-4">¡Imágenes enviadas con éxito!</h3>
            <div className="mb-6">
              <Lottie animationData={successAnimation} loop={false} style={{ width: 200, height: 200, margin: '0 auto' }} />
            </div>
            <p className="mb-6">Tus nuevas fotos serán enviadas a tu correo electrónico pronto ({ imagicaData.upload_info.user.email }).</p>
            <button
              onClick={() => {
                window.location.reload()
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Enterado
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scale-120 {
          transform: scale(0.9);
        }
      `}</style>
    </>
  )
}