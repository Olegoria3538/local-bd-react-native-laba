import React from "react"
import { StyleSheet } from "react-native"
import MapView from "react-native-maps"
import { MarkerBuild } from "../atoms/markers"
import { useStore } from "effector-react"
import { $select } from "../model/select-place"
import { $zIndex } from "../model/change-z-index-map"

export const Maps = () => {
  const data = useStore($select)
  const zIndex = useStore($zIndex)
  return (
    <MapView
      style={styles.mapStyle}
      region={{
        latitude: data?.latitude ? data?.latitude : 55.753215,
        longitude: data?.longitude ? data?.longitude : 37.622504,
        latitudeDelta: zIndex,
        longitudeDelta: zIndex,
      }}
    >
      <MarkerBuild data={data} />
    </MapView>
  )
}

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
})
