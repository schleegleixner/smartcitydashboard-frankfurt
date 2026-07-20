import { NextRequest } from 'next/server'
import { responseIcon } from '@schleegleixner/react-statamic-api'
import sharp from 'sharp'
import iconMap from '@/mapping/IconMapping'
import ReactIcons from '@schleegleixner/react-adobe-icons-package'
import Placeholder from '@/components/Icons/Placeholder'

const allIcons: Record<string, any> = { ...iconMap, ...ReactIcons }

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params
  return await responseIcon(id, req, sharp, allIcons, Placeholder)
}
