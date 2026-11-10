import { TilePayloadType } from '@schleegleixner/react-statamic-api'

export type PassengerDataType = {
  INDEX: number
  value: number
}

export type PassengerContentProps = {
  data: PassengerDataType[]
  tile_payload: TilePayloadType
}

export interface DataValue {
  current: number
  previous: number | null
}
