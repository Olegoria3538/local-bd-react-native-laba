import React, { useState, useEffect } from "react"
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native"
import Constants from "expo-constants"
import { AntDesign } from "@expo/vector-icons"
import { Modal } from "../atoms/modal"
import { db } from "../model/db"
import { Place } from "../atoms/place"

interface itemsType {
  id: number
  value: {
    description: string
    title: string
    pos: string
  }
}

export const Saves = () => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<itemsType[]>([])
  const [deleteMarker, setDeleteMarker] = useState(0)

  useEffect(() => {
    if (open) {
      db.transaction((tx) => {
        tx.executeSql("select * from items", [], (_, { rows }) =>
          setItems(
            //@ts-ignore
            rows._array.map((x) => ({ ...x, value: JSON.parse(x.value) }))
          )
        )
      })
    }
  }, [open, deleteMarker])
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={styles.wrapper}>
          <AntDesign name="save" size={30} color="black" />
        </View>
      </TouchableWithoutFeedback>
      {open && (
        <Modal title={"Cохраненные места"} onClose={() => setOpen(false)}>
          {!!items.length ? (
            items.map(({ id, value: x }, i) => (
              <Place
                key={i}
                description={x.description}
                title={x.title}
                pos={x.pos}
                onClick={() => setOpen(false)}
                type={"delete"}
                id={id}
                deleteCallback={() => setDeleteMarker(deleteMarker + 1)}
              />
            ))
          ) : (
            <Text style={{ padding: 20 }}>Сохраненных мест нет</Text>
          )}
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: Constants.statusBarHeight + 15,
    right: 15,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    opacity: 0.5,
  },
})
