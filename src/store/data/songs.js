import {
  createSlice
} from '@reduxjs/toolkit'

import {
  DataStates
} from 'lib/constants'

import {
  selectors as dataSelectors
} from 'store/data'

export const initialState = () => ({
  data: [],
  status: DataStates.NEVER,
  error: null
})

// PATCH RELATION REDUCER //

export const getSongsFetch = (state, { payload }) => {
  state.status = DataStates.FETCHING
}
export const getSongsSuccess = (state, { payload }) => {
  const { data } = payload
  state.data = data
  state.error = null
  state.status = DataStates.SUCCESS
}
export const getSongsFailure = (state, { payload }) => {
  const { error } = payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// MAIN REDUCER //

const songsSlice = createSlice({
  name: 'songs',

  initialState: initialState(),

  reducers: {
    getSongsFetch,
    getSongsSuccess,
    getSongsFailure
  }
})

export const selectSongs = (state) => dataSelectors.selectData(state).songs
export const selectSongsData = (state) => selectSongs(state).data
export const selectSongsStatus = (state) => selectSongs(state).status
export const selectSongsError = (state) => selectSongs(state).error
export const selectSong = (id) => (state) => selectSongsData(state).find(song => song.name === id)

songsSlice.selectors = {
  selectSongs,
  selectSongsData,
  selectSongsStatus,
  selectSongsError,
  selectSong
}

export const {
  actions,
  reducer,
  selectors
} = songsSlice

export default songsSlice
