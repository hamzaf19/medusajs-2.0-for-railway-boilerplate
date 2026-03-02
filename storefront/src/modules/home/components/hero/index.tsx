import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle flex items-center justify-center">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-8 small:p-32 gap-6">
        <span className="flex flex-col gap-4">
          <Heading
            level="h1"
            className="text-5xl md:text-8xl font-black italic tracking-tighter text-ui-fg-base uppercase"
          >
            Strikerz<span className="text-blue-600">.</span>
          </Heading>
          <Heading
            level="h2"
            className="text-lg md:text-2xl leading-relaxed text-ui-fg-subtle font-normal max-w-2xl mx-auto"
          >
            Équipez-vous aux couleurs de vos Equipe foot et NBA préférés.
          </Heading>
        </span>
        <a href="/store">
          <Button variant="secondary" size="large" className="mt-4">
            Découvrir la collection
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Hero