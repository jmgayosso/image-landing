import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, Send, Camera, AlertCircle } from 'lucide-react'

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
]

export default function ImageUpload() {
  const [images, setImages] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('')
  const [customTheme, setCustomTheme] = useState('')
  const [userName, setUserName] = useState('Usuario')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const name = urlParams.get('name')
    if (name) {
      setUserName(name)
    }
  }, [])

  const onDrop = useCallback((acceptedFiles) => {
    setImages(prevImages => {
      const newImages = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(7),
        uploadProgress: 0,
        status: 'uploading' // 'uploading', 'uploaded', 'error'
      }))
      return [...prevImages, ...newImages].slice(0, 10)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    maxSize: 2 * 1024 * 1024, // 2MB
  })

  const removeImage = (id) => {
    setImages(prevImages => prevImages.filter(image => image.id !== id))
  }

  const simulateUpload = async (id) => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setImages(prevImages => 
        prevImages.map(img => 
          img.id === id ? { ...img, uploadProgress: i } : img
        )
      )
    }
    setImages(prevImages => 
      prevImages.map(img => 
        img.id === id ? { ...img, status: Math.random() > 0.2 ? 'uploaded' : 'error' } : img
      )
    )
  }

  const handleSubmit = async () => {
    if (images.length < 6) {
      alert('Por favor, sube al menos 6 imágenes.')
      return
    }
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setImages([])
  }

  useEffect(() => {
    images.forEach(image => {
      if (image.status === 'uploading' && image.uploadProgress === 0) {
        simulateUpload(image.id)
      }
    })
  }, [images])

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
    )
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-yellow-100 via-orange-200 to-pink-200 font-sans">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-orange-400 to-pink-400">
        <a className="flex items-center justify-center" href="#">
          <Camera className="h-6 w-6 text-yellow-200" />
          <span className="ml-2 text-2xl font-bold text-yellow-200">Imagica.lol</span>
        </a>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">¡Bienvenido, {userName}!</h1>
          <p className="text-lg text-purple-600 mb-6">
            Este es tu enlace personal para subir imágenes. Por favor, no compartas este enlace con nadie más.
          </p>
          <p className="text-md text-purple-700 mb-8">
            Sube tus imágenes para entrenar el modelo y generar tus nuevas y divertidas fotos. Necesitamos un mínimo de 6 imágenes y un máximo de 10.
          </p>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-purple-500 mb-4" />
            <p className="text-lg text-purple-800">
              {isDragActive
                ? 'Suelta las imágenes aquí'
                : 'Arrastra y suelta imágenes aquí, o haz clic para seleccionar'}
            </p>
            <p className="text-sm text-purple-600 mt-2">Mínimo 6 imágenes, máximo 10 imágenes, 2MB por imagen</p>
          </div>

          {images.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Imágenes seleccionadas:</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.preview}
                      alt={`Uploaded ${image.file.name}`}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {image.status === 'uploading' && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                        <div className="flex items-center justify-between">
                          <span>Subiendo: {image.uploadProgress}%</span>
                          <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${image.uploadProgress}%`}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {image.status === 'uploaded' && (
                      <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-50 text-white text-xs p-1">
                        Subida completada
                      </div>
                    )}
                    {image.status === 'error' && (
                      <div className="absolute bottom-0 left-0 right-0 bg-red-500 bg-opacity-50 text-white text-xs p-1 flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Error al subir
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Selecciona una temática:</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.name)}
                  className={`cursor-pointer border-2 rounded-lg p-2 transition-all duration-300 transform ${
                    selectedTheme === theme.name
                      ? 'border-purple-500 bg-purple-100 scale-105 shadow-lg'
                      : 'border-gray-300 bg-white scale-100'
                  }`}
                >
                  <img src={theme.image} alt={theme.name} className="w-full h-70 object-cover rounded mb-2" />
                  <p className="text-center text-sm">{theme.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <label htmlFor="customTheme" className="block text-sm font-medium text-purple-700 mb-2">
              O describe tu propia temática:
            </label>
            <input
              type="text"
              id="customTheme"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe tu temática personalizada aquí"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={images.length < 6 || images.length > 10 || (!selectedTheme && !customTheme)}
            className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 flex items-center justify-center gap-2 text-xl px-6 py-3 rounded-full w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Send className="h-6 w-6" />
            Enviar Imágenes
          </button>
        </div>
      </main>
    </div>
  )
}