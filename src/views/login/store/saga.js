import { takeLast, put } from 'redux-saga'
import axios from 'axios'

export function* login(user) {
  try {
    let res = yield axios.post()
    if (res.data.code === 'OK') {
      let user = yield axios.post()
    } 
  } catch(e) {
    
  }
  
}