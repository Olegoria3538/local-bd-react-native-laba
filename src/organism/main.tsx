import React, { useEffect } from "react"
import { Input } from "../molecules/input"
import { $toggle } from "../model/places-open"
import { useStore } from "effector-react"
import { Places } from "../molecules/places"
import { Maps } from "../molecules/map"
import { Saves } from "../molecules/saves"
import { db } from "../model/db"

export const Main = () => {
  useEffect(() => {
    db.transaction((tx) => {
      //tx.executeSql("DROP TABLE items;")
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, value text UNIQUE);"
      )
    })
  }, [])

  const toggle = useStore($toggle)
  return (
    <>
      <Maps />
      <Saves />
      {toggle && <Places />}
      <Input />
    </>
  )
}
