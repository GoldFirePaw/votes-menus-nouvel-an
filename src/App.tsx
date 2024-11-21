import "./App.css"
import { DisplayDishes } from "./components/displayDishes/displayDishes"
import React from "react"

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <DisplayDishes />
      </header>
    </div>
  )
}
