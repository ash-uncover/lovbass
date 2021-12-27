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

export const getSetsFetch = (state, { payload }) => {
  state.status = DataStates.FETCHING
}
export const getSetsSuccess = (state, { payload }) => {
  const { data } = payload
  state.data = data
  state.error = null
  state.status = DataStates.SUCCESS
}
export const getSetsFailure = (state, { payload }) => {
  const { error } = payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// MAIN REDUCER //

const setsSlice = createSlice({
  name: 'songs',

  initialState: initialState(),

  reducers: {
    getSetsFetch,
    getSetsSuccess,
    getSetsFailure
  }
})

export const selectSets = (state) => dataSelectors.selectData(state).sets
export const selectSetsData = (state) => selectSets(state).data
export const selectSetsStatus = (state) => selectSets(state).status
export const selectSetsError = (state) => selectSets(state).error
export const selectSet = (id) => (state) => selectSetsData(state)[id]

setsSlice.selectors = {
  selectSets,
  selectSetsData,
  selectSetsStatus,
  selectSetsError,
  selectSet
}

export const {
  actions,
  reducer,
  selectors
} = setsSlice

export default setsSlice
