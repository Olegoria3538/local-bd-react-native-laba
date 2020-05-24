import React from "react"
import { ScrollView, Text } from "react-native"
import { Place } from "../atoms/place"
import { $result } from "../model/request"
import { useStore } from "effector-react"
import { setToggle } from "../model/places-open"
import { Preloader } from "../atoms/preloader"
import { Modal } from "../atoms/modal"

export const Places = () => {
  const { arrayAnswer, info } = useStore($result)
  if (!info) return <Preloader />
  const formatArray = arrayAnswer.map((x) => ({
    description: x.GeoObject.metaDataProperty.GeocoderMetaData.text,
    title: x.GeoObject.name,
    pos: x.GeoObject.Point.pos,
  }))
  return (
    <Modal
      title={`Результаты по: ${info.request}`}
      onClose={() => setToggle(false)}
    >
      <ScrollView>
        {Number(info.found) ? (
          formatArray.map((x, i) => (
            <Place
              key={i}
              description={x.description}
              title={x.title}
              pos={x.pos}
              onClick={() => setToggle(false)}
              type={"save"}
            />
          ))
        ) : (
          <Text style={{ padding: 20 }}>Мы ничего не нашли</Text>
        )}
      </ScrollView>
    </Modal>
  )
}
