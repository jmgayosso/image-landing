import { Camera, Wand2, MessageCircle } from "lucide-react"

export default function Component() {
  const openWhatsApp = () => {
    window.open('https://web.whatsapp.com/send?phone=TU_NUMERO_DE_TELEFONO', '_blank')
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-yellow-100 font-comic-sans">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-orange-400">
        <a className="flex items-center justify-center" href="#">
          <Camera className="h-6 w-6 text-yellow-200" />
          <span className="ml-2 text-2xl font-bold text-yellow-200">Imagica.lol 😂</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4 text-yellow-200" href="#">
            Características 🎉
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4 text-yellow-200" href="#">
            Cómo Funciona 🤔
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4 text-yellow-200" href="#">
            Sobre Nosotros 🤪
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-purple-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-yellow-300 drop-shadow-lg">
                  ¡Transforma tus Fotos con Magia AI! 🧙‍♂️✨
                </h1>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Imagica.lol convierte tus selfies comunes en aventuras extraordinarias. ¡Sé una estrella de rock 🎸, monta un dragón 🐉, o
                  da una charla TED 🎤 - todo a través de WhatsApp! 🤣
                </p>
              </div>
              <button
                className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 text-lg px-6 py-3 rounded-full animate-bounce"
                onClick={openWhatsApp}
              >
                <MessageCircle className="h-6 w-6" />
                ¡Comienza la Risa en WhatsApp 😆
              </button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-400">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-purple-700 text-center mb-8">
              Cómo Funciona (¡Es Pan Comido! 😎)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <MessageCircle className="h-12 w-12 text-purple-700 mb-4" />
                <h3 className="text-xl font-bold text-purple-800">1. Chatea con Nosotros 💬</h3>
                <p className="text-purple-900">Inicia una conversación divertidísima con Imagica.lol en WhatsApp.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Camera className="h-12 w-12 text-purple-700 mb-4" />
                <h3 className="text-xl font-bold text-purple-800">2. Envía tu Foto 📸</h3>
                <p className="text-purple-900">¡Sube la foto que quieres transformar en una explosión de risa!</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Wand2 className="h-12 w-12 text-purple-700 mb-4" />
                <h3 className="text-xl font-bold text-purple-800">3. Recibe la Magia 🎩✨</h3>
                <p className="text-purple-900">¡Obtén tu imagen transformada en segundos! ¡Prepárate para morirte de risa!</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-400">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                alt="Transformaciones de Imagica"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/placeholder.svg?height=310&width=550"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-200">
                    Tus Fotos, Reimaginadas 🖼️🤯
                  </h2>
                  <p className="max-w-[600px] text-yellow-100 md:text-xl">
                    Con Imagica.lol, no solo tomas fotos - ¡creas nuevas realidades! ¡Conviértete en un golfista profesional ⛳, un
                    artista de hip hop 🎤, o protagoniza tu programa de TV favorito 📺! ¡Las posibilidades son tan infinitas como tu risa! 😂
                  </p>
                </div>
                <button
                  className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 w-fit px-6 py-3 rounded-full animate-pulse"
                  onClick={openWhatsApp}
                >
                  <MessageCircle className="h-5 w-5" />
                  ¡Pruébalo Ahora en WhatsApp 🚀
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-400">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-300">
                  ¿Listo para Reírte con Nuevas Fotos? 🤣📸
                </h2>
                <p className="mx-auto max-w-[600px] text-yellow-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ¡Únete a miles de usuarios felices (y risueños) y comienza tu viaje con Imagica.lol hoy! Advertencia: ¡Puede causar risa incontrolable! 😆
                </p>
              </div>
              <button
                className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 text-lg px-6 py-3 rounded-full animate-bounce"
                onClick={openWhatsApp}
              >
                <MessageCircle className="h-6 w-6" />
                ¡Abre WhatsApp y Diviértete! 🤪
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-orange-400 border-yellow-300">
        <p className="text-xs text-yellow-200">© 2023 Imagica.lol Inc. Todos los derechos reservados. Ninguna risa fue lastimada en la creación de este sitio web. 😉</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4 text-yellow-200" href="#">
            Términos de Locura 📜
          </a>
          <a className="text-xs hover:underline underline-offset-4 text-yellow-200" href="#">
            Privacidad (¡No es Broma!) 🔒
          </a>
        </nav>
      </footer>
    </div>
  )
}
