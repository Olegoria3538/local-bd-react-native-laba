import { createStore, createEvent } from "effector"
import { selectType } from "../type"

const $select = createStore<selectType>(null)

type setSelectType = {
  pos: string
  title: string
  description: string
}

const setSelect = createEvent<setSelectType>("")

$select.on(setSelect, (_, { pos, title, description }) => {
  const [latitude, longitude] = pos
    .split(" ")
    .map((x) => Number(x))
    .reverse()
  return {
    latitude,
    longitude,
    title,
    description,
  }
})

export { $select, setSelect }
