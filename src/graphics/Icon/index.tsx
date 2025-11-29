// /Users/zix/Desktop/Znika-exp/znika/src/graphics/Icon/Index.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type IconProps = {
  /** Square size in px */
  size?: number
  /** Extra classes (tailwind, etc.) */
  className?: string
  /** Accessible alt text when not decorative */
  alt?: string
  /** Wrap the icon in a link if provided */
  href?: string | null
  /** Mark as decorative to hide from screen readers */
  decorative?: boolean
  /** Pass through Next/Image priority */
  priority?: boolean
}

export const Icon: React.FC<IconProps> = ({
  size = 32,
  className,
  alt = 'Znika icon',
  href = null,
  decorative = true,
  priority = false,
}) => {
  const img = (
    <Image
      src="/favicon.svg"
      alt={decorative ? '' : alt}
      width={size}
      height={size}
      aria-hidden={decorative}
      priority={priority}
      className={className}
    />
  )

  return href ? <Link href={href}>{img}</Link> : img
}

export default Icon
