import { Camera, Wand2, Mail } from "lucide-react"
import Examples from './assets/examples.png'
import ImageCarousel from "./components/carousel"
import InstagramFeed from "./components/instagramFeed"
import imagicaProfile from './assets/imagicaProfile.png'

import './styles/customStyles.css';

export default function Component() {
  const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-yellow-100 via-orange-200 to-pink-200 font-sans">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-orange-400 to-pink-400">
        <a className="flex items-center justify-center" href="#">
          <Camera className="h-6 w-6 text-yellow-200" />
          <span className="ml-2 text-2xl font-bold text-yellow-200">Imagica.lol</span>
        </a>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-20 bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-10 text-center">
              <div className="space-y-2">
                <h1 className="tracking-cnormal text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-yellow-300 drop-shadow-lg mb-8">
                  Transforma tus Selfies en Magia lol
                </h1>

                <img
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last sm:max-w-[180px] lg:max-w-[600px]"
                  alt="Transformaciones de Imagica"
                  height="190"
                  src={Examples}
                  width="auto"
                />

              </div>
              <a
                className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2 text-xl px-6 py-3 rounded-full animate-bounce"
                href="#payment-section"
              >
                <Mail className="h-6 w-6" />
                Obtén tus fotos mágicas ahora
              </a>
              <p className="mt-5 mx-auto max-w-[900px] text-yellow-100 text-lg lg:text-2xl">
                Convierte tus selfies en aventuras. Actua en tu pelicula favorita 🎬, viaja por el mundo 🗽, conviertete en caballero medieval ⚔️, magnate o miles de personajes mas 🛩️. ¡Todo en línea!
              </p>
            </div>
          </div>
        </section>
        <section id="payment-section" className="w-full py-8 md:py-15 lg:py-24 bg-gradient-to-b from-pink-500 via-orange-400 to-yellow-400">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-purple-800 text-center mb-8">
            ¿Cómo funciona?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <Mail className="h-12 w-12 text-purple-800 mb-4" />
                <h3 className="text-xl font-bold text-purple-900">1. Paga y recibe confirmación 💳</h3>
                <p className="text-purple-950">Realiza el pago y recibirás un correo electrónico con un enlace de acceso al portal de Imagica.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Camera className="h-12 w-12 text-purple-800 mb-4" />
                <h3 className="text-xl font-bold text-purple-900">2. Sube tus selfies 🤳</h3>
                <p className="text-purple-950">En el portal de Imagica, sube tus selfies de buena calidad donde se vea claramente tu cara desde distintos ángulos.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Wand2 className="h-12 w-12 text-purple-800 mb-4" />
                <h3 className="text-xl font-bold text-purple-900">3. Elige tus temáticas 🎭</h3>
                <p className="text-purple-950">Selecciona las temáticas para tus nuevas fotos en el portal de Imagica.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Mail className="h-12 w-12 text-purple-800 mb-4" />
                <h3 className="text-xl font-bold text-purple-900">4. Recibe tus fotos ✨</h3>
                <p className="text-purple-950">En menos de 24 horas, recibirás un correo con tus nuevas y divertidas fotos listas.</p>
              </div>
            </div>
            <div className="flex justify-center mt-20">
              <stripe-buy-button
                buy-button-id="buy_btn_1Q5UM1IZsF3d42AFTYvtXQfI"
                publishable-key="pk_live_51IbSIBIZsF3d42AF1kneL4R37qjTgmW04pPuMHWjcLUaHX36u9aYHZS9a7eCr02RY50ncZIfij9s9EzHKOGdDy1j00l08Cx1jf"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-5 lg:py-5 bg-gradient-to-b from-yellow-400 via-green-400 to-blue-400">
          <div className="px-4 md:px-6 mx-auto">
            <div className="">
              <div className="container px-4 md:px-6 mx-auto">
                <h2 className="tracking-cnormal my-5 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-purple-900">
                  Ideas 💡📸
                </h2>
              </div>
              <div className="flex flex-col justify-center space-y-10">
                <div className="">
                  <section>
                    <ImageCarousel />
                  </section>
                </div>
              </div>
              <div className="container px-4 md:px-6 mx-auto flex items-center justify-start gap-x-5 mt-16">
                <h2 className="tracking-cnormal my-5 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-purple-900">
                  Estamos en Insta
                </h2>
              </div>
              <section>
                <InstagramFeed accessToken={accessToken} />
              </section>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-400">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-10 text-center">
              <div className="space-y-4">
                <h2 className="tracking-cnormal text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-300">
                  ¿Listo para divertirte con nuevas fotos? 🤣 💁‍♀️🕺
                </h2>
                <p className="mx-auto max-w-[900px] text-yellow-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ¡Únete a miles de personas felices que usan Imagica todos los dias!
                </p>
              </div>
              <a
                className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2 text-lg px-6 py-3 rounded-full animate-bounce"
                href="#payment-section"
              >
                <Mail className="h-6 w-6" />
                Obtén tus fotos mágicas ahora
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gradient-to-r from-purple-400 to-pink-400 border-yellow-300">
        <p className="text-xs text-yellow-200">© 2024 Imagica.lol S.A. de C.V. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a 
            className="text-xs hover:underline underline-offset-4 text-yellow-200" 
            href="./agreement.pdf" 
            target="_blank" 
            rel="noopener noreferrer">
            Términos y Condiciones
          </a>
        </nav>
      </footer>
    </div>
  )
}