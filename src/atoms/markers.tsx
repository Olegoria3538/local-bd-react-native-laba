import React from "react"
import { Marker } from "react-native-maps"
import { selectType } from "../type"

export const MarkerBuild: React.FC<{ data: selectType }> = ({ data }) => {
  if (!data) return null
  return (
    <Marker
      coordinate={{ latitude: data.latitude, longitude: data.longitude }}
      title={data.title}
      description={data.description}
    />
  )
}
