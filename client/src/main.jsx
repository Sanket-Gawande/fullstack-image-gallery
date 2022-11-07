import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../redux/user.slice"
const store = configureStore({
  reducer: {
    user: userSlice
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>

)
