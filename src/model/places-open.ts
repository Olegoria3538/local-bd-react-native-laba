import { createStore, createEvent } from "effector"

const $toggle = createStore<boolean>(false)

const setToggle = createEvent<boolean>("")

$toggle.on(setToggle, (_, x) => x)

export { $toggle, setToggle }
