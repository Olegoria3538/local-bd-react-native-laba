import React from "react"
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native"
import Constants from "expo-constants"

interface ModalType {
  title: string
  onClose: Function
}

export const Modal: React.FC<ModalType> = ({ title, onClose, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.header}>
          <Text>{title}</Text>
          <TouchableWithoutFeedback onPress={() => onClose()}>
            <Text style={styles.close}>×</Text>
          </TouchableWithoutFeedback>
        </View>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    padding: 10,
    paddingBottom: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
  },
  block: {
    flex: 0,
    marginTop: Constants.statusBarHeight + 15,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    height: 50,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    position: "relative",
    justifyContent: "center",
    paddingLeft: 20,
  },
  close: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
  },
})
