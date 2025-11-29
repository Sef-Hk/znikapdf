import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
}

export const BannerBlock: React.FC<Props> = ({ className }) => {
  return <div className={cn('mx-auto my-8 w-full', className)}></div>
}
