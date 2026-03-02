import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-16 mx-auto border-b border-neutral-200 bg-white/80 backdrop-blur-md transition-colors duration-300">
        <nav className="content-container flex items-center w-full h-full">

          {/* GAUCHE - logo */}
          <div className="flex-1 basis-0 flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-ui-fg-base hover:opacity-80 transition-opacity duration-300"
              data-testid="nav-store-link"
            >
              Strikerz<span className="text-blue-600">.</span>
            </LocalizedClientLink>
          </div>

          {/* CENTRE - navigation */}
          <div className="hidden small:flex items-center justify-center gap-x-10 h-full">
            <LocalizedClientLink
              href="/"
              className="text-xs font-black italic uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
              data-testid="nav-home-link-center"
            >
              ACCUEIL
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="text-xs font-black italic uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
              data-testid="nav-store-link-center"
            >
              BOUTIQUE
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/search"
              scroll={false}
              className="text-xs font-black italic uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
              data-testid="nav-search-link-center"
            >
              RECHERCHER
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account"
              className="text-xs font-black italic uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
              data-testid="nav-account-link-center"
            >
              COMPTE
            </LocalizedClientLink>
          </div>

          {/* DROITE - panier */}
          <div className="flex-1 basis-0 flex items-center justify-end">
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="text-xs font-black italic uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                  data-testid="nav-cart-link"
                >
                  PANIER (0)
                </LocalizedClientLink>
              }
            >
              <CartButtonWrapper />
            </Suspense>
          </div>

        </nav>
      </header>
    </div>
  )
}

function CartButtonWrapper() {
  return (
    <div className="text-xs font-black italic uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-300">
      <CartButton />
    </div>
  )
}
