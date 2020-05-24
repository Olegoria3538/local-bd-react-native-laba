import React from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { db } from "../model/db"
import { setSelect } from "../model/select-place"

interface PlaceType {
  description: string
  title: string
  pos: string
  onClick: Function
  type: "save" | "delete"
  id?: number
  deleteCallback?: () => void
}

interface addSaveType {
  description: string
  title: string
  pos: string
}

const addSave = ({ description, title, pos }: addSaveType): void => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into items (value) values (?)",
      [JSON.stringify({ description, title, pos })],
      () => {
        ToastAndroid.show("Сохранено", ToastAndroid.SHORT)
      },
      //@ts-ignore
      () => {
        ToastAndroid.show("Уже есть в списке", ToastAndroid.SHORT)
      }
    )
  })
}

const deleteItems = (id: number, callBack: () => void): void => {
  db.transaction(
    (tx) => {
      tx.executeSql(`delete from items where id = ?;`, [id], () => {
        ToastAndroid.show("Удалено", ToastAndroid.SHORT)
      })
    },
    undefined,
    callBack
  )
}

export const Place: React.FC<PlaceType> = ({
  description,
  title,
  pos,
  onClick,
  type,
  id,
  deleteCallback,
}) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          setSelect({
            description,
            title,
            pos,
          })
          onClick()
        }}
      >
        <Text style={styles.title}>{description}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (type === "save") addSave({ description, title, pos })
          if (type === "delete" && id && deleteCallback)
            deleteItems(id, deleteCallback)
        }}
        style={{ marginLeft: "auto" }}
      >
        <Feather name={type} size={20} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomColor: "#DADCE0",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    paddingRight: 25,
  },
})
