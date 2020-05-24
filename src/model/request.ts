import { createStore, createEffect, combine, createEvent } from "effector"
import { RootObject } from "../type"

const $data = createStore<RootObject>({})

const getData = createEvent<string>()
$data.on(getData, (_, req) => {
  getDataFx(req)
  return {}
})

const getDataFx = createEffect<string, RootObject, any>({
  handler: async (request) => {
    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=bd363d28-0cb5-4691-bea0-b87777ad38ad&format=json&geocode=${request}`
    const req = await fetch(url)
    return req.json()
  },
})

$data.on(getDataFx.done, (_, { result }) => result)

const $arrayAnswer = $data.map(
  (x) => x.response?.GeoObjectCollection.featureMember || []
)

const $geocoderResponseMetaData = $data.map(
  (x) =>
    x.response?.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData ||
    null
)

const $result = combine({
  arrayAnswer: $arrayAnswer,
  info: $geocoderResponseMetaData,
})

export { getData, $result }
