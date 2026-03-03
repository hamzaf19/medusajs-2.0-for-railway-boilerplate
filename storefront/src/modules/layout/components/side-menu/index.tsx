"use client"

import { Popover, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  ACCUEIL: "/",
  BOUTIQUE: "/store",
  RECHERCHER: "/search",
  COMPTE: "/account",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  void regions

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-10 w-10 flex items-center justify-center transition-all ease-out duration-200 focus:outline-none text-ui-fg-base"
                  aria-label="Ouvrir le menu"
                >
                  <span className="sr-only">Menu</span>
                  <span className="flex flex-col gap-1">
                    <span className="block h-0.5 w-5 bg-neutral-900" />
                    <span className="block h-0.5 w-5 bg-neutral-900" />
                    <span className="block h-0.5 w-5 bg-neutral-900" />
                  </span>
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 z-[80]">
                  <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={close}
                    aria-hidden="true"
                  />

                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Popover.Panel className="fixed inset-y-0 right-0 h-screen w-[80vw] max-w-sm bg-neutral-950 border-l border-neutral-800 text-white">
                      <div
                        data-testid="nav-menu-popup"
                        className="flex flex-col h-full px-6 py-8"
                      >
                        <div className="flex justify-end" id="xmark">
                          <button
                            data-testid="close-menu-button"
                            onClick={close}
                            className="h-10 w-10 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                            aria-label="Fermer le menu"
                          >
                            <XMark />
                          </button>
                        </div>

                        <ul className="flex-1 flex flex-col items-start justify-center gap-y-8 mt-4">
                          {Object.entries(SideMenuItems).map(([name, href]) => {
                            return (
                              <li key={name}>
                                <LocalizedClientLink
                                  href={href}
                                  className="text-lg md:text-xl font-bold uppercase italic tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
                                  onClick={close}
                                  data-testid={`${name.toLowerCase()}-link`}
                                >
                                  {name}
                                </LocalizedClientLink>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
