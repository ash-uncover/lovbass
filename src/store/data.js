import { combineReducers } from 'redux'

import { reducer as songs } from 'store/data/songs'
import { reducer as sets } from 'store/data/sets'

export const reducer = combineReducers({
  sets,
  songs
})

export const selectData = (state) => state.data

export const selectors = {
  selectData
}

export default {
  reducer,
  selectors
}
