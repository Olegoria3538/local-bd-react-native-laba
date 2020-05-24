import React from "react"
import { StyleSheet, View } from "react-native"
//@ts-ignore
import AnimatedLoader from "react-native-animated-loader"
import loader from "../statick/19921-ripple-dark-green.json"

export const Preloader = () => {
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(0, 0, 0, 0)"
        source={loader}
        animationStyle={styles.lottie}
        speed={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  lottie: {
    width: 150,
    height: 150,
  },
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 10,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
})
