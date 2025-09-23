// components/ZnikaLogo.tsx
import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function ZnikaLogo({
  className,
  width = 160,
  height = 52,
  priority = false,
}: Props) {
  return (
    <Image
      src="/logoblack.jpg"
      alt="Znika Experience"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  )
}
