import * as Icons from '@/components/Icons/ActionFields'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import IconPlaceholder from '@/components/Icons/Placeholder'

export const ActionFieldsColorMap: Record<string, TileVariantTypes> = {
  bildung: 'red',
  'globale-verantwortung-eine-welt-und-nachhaltige-beschaffung': 'green',
  'klima-umwelt-und-ressourcen': 'blue',
  'nachhaltige-mobilitaet': 'purple',
  'nachhaltige-stadtentwicklung': 'orange',
  'soziale-gerechtigkeit-und-gesundheitliche-chancengleichheit': 'glacial',
  'wirtschaft-und-finanzen': 'brown',
} as const

export const ActionFieldsIconMap = {
  bildung: IconPlaceholder,
  'globale-verantwortung-eine-welt-und-nachhaltige-beschaffung':
    Icons.GlobaleVerantwortung,
  'klima-umwelt-und-ressourcen': Icons.KlimaResourcenUmwelt,
  'nachhaltige-mobilitaet': Icons.NachhaltigeMobilitaet,
  'nachhaltige-stadtentwicklung': Icons.NachhaltigeStadtentwicklung,
  'soziale-gerechtigkeit-und-gesundheitliche-chancengleichheit':
    Icons.PartizipationUndTeilhabe,
  'wirtschaft-und-finanzen': Icons.ArbeitUndWirtschaft,
}
