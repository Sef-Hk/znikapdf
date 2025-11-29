'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  href?: string
  className?: string
  width?: number
  height?: number
  alt?: string
}

export const Logo: React.FC<LogoProps> = ({
  href = '/',
  className,
  width = 160,
  height = 48,
  alt = 'Znika Logo',
}) => {
  const img = (
    <Image
      src="/znika_blue.svg"
      alt={alt}
      width={width}
      height={height}
      priority
      className={className}
    />
  )

  return href ? <Link href={href}>{img}</Link> : img
}
