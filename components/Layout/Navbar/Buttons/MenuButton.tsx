import React from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getGlobalString } from '@schleegleixner/react-statamic-api'
import Text from '@/components/Elements/Text'
import ButtonBase from './ButtonBase'

export default function MenuButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const icon_classes = 'stroke-inherit w-8 pr-2 text-primary md:w-12'

  return (
    <ButtonBase onClick={() => setIsOpen(prev => !prev)}>
      <div className="overflow-hidden">
        {isOpen ? (
          <XMarkIcon className={icon_classes} />
        ) : (
          <Bars3Icon className={icon_classes} />
        )}
      </div>
      <Text className="uppercase text-inherit" family="condensed">
        {getGlobalString('menu')}
      </Text>
    </ButtonBase>
  )
}
