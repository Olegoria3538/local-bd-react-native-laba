import { createStore, createEvent } from "effector"

const $zIndex = createStore<number>(0.6)

const setZIndex = createEvent<number>()

$zIndex.on(setZIndex, (_, v) => v)

export { $zIndex, setZIndex }
