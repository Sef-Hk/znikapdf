// components/ZnikaLogo.tsx
import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  imageUrl: any
}

export default function ZnikaLogo({
  className,
  width = 160,
  height = 52,
  priority = false,
  imageUrl,
}: Props) {
  const LogoUrl = typeof imageUrl === 'object' && imageUrl.url
  // console.log({ LogoUrl })

  return (
    <Image
      src={LogoUrl}
      alt="Znika Experience"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  )
}
