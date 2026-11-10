import { IconComponent } from '@schleegleixner/react-adobe-icons-package'
import IconStadtkarte from '@/components/Icons/Stadtkarte'
import {
  ArrowLongLeftIcon as ArrowLeft,
  ArrowLongRightIcon as ArrowRight,
} from '@heroicons/react/24/outline'

const iconMap: Record<string, IconComponent> = {
  stadtkarte: IconStadtkarte,
  arrow_right: ArrowRight,
  arrow_left: ArrowLeft,
}

export default iconMap
