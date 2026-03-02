import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="bg-neutral-950 text-white w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-16 md:py-24">
          {/* Brand */}
          <div className="flex flex-col gap-y-4">
            <LocalizedClientLink
              href="/"
              className="text-3xl font-black italic uppercase tracking-tighter text-white hover:opacity-80 transition-opacity"
            >
              Strikerz<span className="text-blue-600">.</span>
            </LocalizedClientLink>
            <p className="text-sm text-white/50 max-w-xs">
              Maillots premium football &amp; basketball. Performance. Style.
              Passion.
            </p>
          </div>

          {/* Links */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Catégories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-sm text-white/60"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-white transition-colors",
                            children && "font-medium"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-white transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-sm text-white/60",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-white transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                Aide
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-sm text-white/60">
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/content/privacy-policy"
                    className="hover:text-white transition-colors"
                  >
                    Politique de confidentialité
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/content/terms"
                    className="hover:text-white transition-colors"
                  >
                    Conditions générales
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full py-8 justify-between border-t border-white/10 text-white/40">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Strikerz. Tous droits réservés.
          </Text>
        </div>
      </div>
    </footer>
  )
}
