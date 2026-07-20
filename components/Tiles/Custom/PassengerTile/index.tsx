import { getDataSource, TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import PassengerContent from './PassengerContent'
import { PassengerDataType } from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function Tile({ type, tile_payload }: TileProps) {
  const passenger_data = getDataSource(tile_payload) as PassengerDataType[]

  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      {passenger_data ? (
        <PassengerContent data={passenger_data} tile_payload={tile_payload} />
      ) : (
        <RequestIndicator />
      )}
    </IconTile>
  )
}
