import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import Text from '@/components/Elements/Text'
import IconFactory from '@/utils/factories/IconFactory'
import { getVariantType } from '@/utils/payload'

export default function IconTextContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  const variant = getVariantType(tile_payload)
  const highlight_text = tile_payload?.highlight_text
  const legend_text = tile_payload?.legend

  return (
    <div className="mb-4 flex flex-row gap-6">
      {tile_payload.icon && (
        <div className="w-16 md:w-24 lg:w-32 flex-shrink-0 overflow-hidden max-w-[25%]">
          <IconFactory
            className="mt-2 w-full"
            type={tile_payload.icon}
            variant={tile_payload.icon_variant || variant}
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-2">
        {highlight_text && (
          <Text as="h1" markdown variant={tile_payload.icon_variant || variant}>
            {highlight_text}
          </Text>
        )}
        {legend_text && (
          <Text as="md" markdown>
            {legend_text}
          </Text>
        )}
      </div>
    </div>
  )
}
