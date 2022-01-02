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

export const getSetsFetchFirst = (state, { payload }) => { // eslint-disable-line no-unused-vars
  state.status = DataStates.FETCHING_FIRST
}
export const getSetsFetch = (state, { payload }) => { // eslint-disable-line no-unused-vars
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
    getSetsFetchFirst,
    getSetsFetch,
    getSetsSuccess,
    getSetsFailure
  }
})

export const selectSets = (state) => dataSelectors.selectData(state).sets
export const selectSetsData = (state) => selectSets(state).data
export const selectSetsStatus = (state) => selectSets(state).status
export const selectSetsError = (state) => selectSets(state).error
export const selectSet = (date) => (state) => selectSetsData(state).find(set => set.date === date)
export const selectSetLatest = (state) => {
  const sets = selectSetsData(state)
  return sets.reduce((result, set) => {
    if (result === null) {
      return set
    }
    if (set.date.localeCompare(result.date) > 0) {
      return set
    }
    return result
  }, null)
}

setsSlice.selectors = {
  selectSets,
  selectSetsData,
  selectSetsStatus,
  selectSetsError,
  selectSet,
  selectSetLatest
}

export const {
  actions,
  reducer,
  selectors
} = setsSlice

export default setsSlice
