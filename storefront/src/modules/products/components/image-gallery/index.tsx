"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const goTo = (index: number) => {
    const track = trackRef.current

    if (!track || images.length === 0) {
      return
    }

    const safeIndex = Math.max(0, Math.min(index, images.length - 1))
    const slideWidth = track.clientWidth

    track.scrollTo({
      left: safeIndex * slideWidth,
      behavior: "smooth",
    })

    setCurrentIndex(safeIndex)
  }

  useEffect(() => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const onScroll = () => {
      const slideWidth = track.clientWidth

      if (!slideWidth) {
        return
      }

      const index = Math.round(track.scrollLeft / slideWidth)
      const safeIndex = Math.max(0, Math.min(index, images.length - 1))
      setCurrentIndex(safeIndex)
    }

    track.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      track.removeEventListener("scroll", onScroll)
    }
  }, [images.length])

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] flex-none w-full snap-center overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 100vw, (max-width: 1024px) 80vw, 60vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </Container>
          )
        })}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            aria-label="Image précédente"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === images.length - 1}
            aria-label="Image suivante"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </>
      )}
    </div>
  )
}

export default ImageGallery
