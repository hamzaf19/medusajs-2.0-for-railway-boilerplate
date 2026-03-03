import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

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

          {/* CENTRE - navigation desktop */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-x-8 h-full">
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

          {/* DROITE - panier + menu mobile */}
          <div className="flex-1 basis-0 flex items-center justify-end gap-x-4">
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  aria-label="Panier"
                  className="relative inline-flex h-6 w-6 items-center justify-center text-neutral-700 hover:opacity-70 transition-opacity"
                  data-testid="nav-cart-link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.5 8.5L8 20H16L17.5 8.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 8.5V7.5C9.5 6.12 10.62 5 12 5C13.38 5 14.5 6.12 14.5 7.5V8.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sr-only">Panier</span>
                  <span className="absolute -top-1.5 -right-1.5 rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold bg-blue-600 text-white">
                    0
                  </span>
                </LocalizedClientLink>
              }
            >
              <CartButtonWrapper />
            </Suspense>

            <div className="md:hidden h-full flex items-center">
              <SideMenu regions={regions} />
            </div>
          </div>

        </nav>
      </header>
    </div>
  )
}

function CartButtonWrapper() {
  return (
    <div className="text-neutral-700">
      <CartButton />
    </div>
  )
}
