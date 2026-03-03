import CartDropdown from "../cart-dropdown"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems
  }

  return cart
}

export default async function CartButton() {
  const cart = await fetchCart()
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const trigger = (
    <LocalizedClientLink
      href="/cart"
      data-testid="nav-cart-link"
      aria-label="Panier"
      className="relative inline-flex h-6 w-6 items-center justify-center hover:opacity-70 transition-opacity"
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
        {totalItems}
      </span>
    </LocalizedClientLink>
  )

  return <CartDropdown cart={cart} trigger={trigger} />
}
