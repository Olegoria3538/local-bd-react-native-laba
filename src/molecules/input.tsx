import React, { useState, useEffect, useMemo } from "react"
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Button,
  Text,
} from "react-native"
import { getData } from "../model/request"
import { setToggle } from "../model/places-open"
import { Slider } from "react-native"
import { useStore } from "effector-react"
import { $zIndex, setZIndex } from "../model/change-z-index-map"

export const Input = () => {
  const zIndex = useStore($zIndex)
  const [text, setText] = useState<string>("")
  const [focus, setFocus] = useState<boolean>(false)

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardShow)
    Keyboard.addListener("keyboardDidHide", keyboardHide)

    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardShow)
      Keyboard.removeListener("keyboardDidHide", keyboardHide)
    }
  }, [])

  const keyboardShow = () => setFocus(true)
  const keyboardHide = () => setFocus(false)

  const thisDirect = useMemo(
    () => !(!!text.length && !!isNaN(Number(text[0]))),
    [text]
  )
  const thisOpposite = useMemo(
    () => !(!!text.length && !isNaN(Number(text[0]))),
    [text]
  )

  return (
    <View style={styles.downBar}>
      <TextInput
        style={styles.input}
        placeholder="Поиск"
        onChangeText={(text) => setText(text)}
        defaultValue={text}
      />
      {focus && (
        <>
          <View style={styles.toggleWrapper}>
            <View style={styles.toggle}>
              <Button
                title="Прямое"
                color="#f194ff"
                disabled={thisDirect}
                onPress={() => null}
              />
            </View>
            <View style={styles.toggle}>
              <Button
                title="Обратное"
                color="#f194ff"
                disabled={thisOpposite}
                onPress={() => null}
              />
            </View>
          </View>

          <View style={styles.trackBar}>
            <Slider
              style={{ flex: 1, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={zIndex}
              onValueChange={(v) => setZIndex(v)}
              step={0.01}
            />
            <Text style={{ width: 30 }}>{String(zIndex).slice(0, 4)}</Text>
          </View>

          <View style={styles.button}>
            <Button
              title="Поиск"
              onPress={() => {
                getData(text)
                setToggle(true)
              }}
              disabled={!text.length}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    paddingTop: 0,
  },
  downBar: {
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  input: {
    height: 50,
    paddingLeft: 20,
  },
  mapStyle: {
    flex: 1,
  },
  toggleWrapper: {
    margin: 20,
    marginTop: 10,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgb(223, 223, 223)",
  },
  toggle: {
    width: "50%",
  },
  trackBar: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingRight: 20,
  },
})
