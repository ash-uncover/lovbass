import { combineReducers } from 'redux'

import { reducer as songs } from 'store/data/songs'
import { reducer as events } from 'store/data/events'

export const reducer = combineReducers({
  events,
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
