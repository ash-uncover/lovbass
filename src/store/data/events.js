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

export const getEventsFetchFirst = (state, { payload }) => { // eslint-disable-line no-unused-vars
  state.status = DataStates.FETCHING_FIRST
}
export const getEventsFetch = (state, { payload }) => { // eslint-disable-line no-unused-vars
  state.status = DataStates.FETCHING
}
export const getEventsSuccess = (state, { payload }) => {
  const { data } = payload
  state.data = data
  state.error = null
  state.status = DataStates.SUCCESS
}
export const getEventsFailure = (state, { payload }) => {
  const { error } = payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// MAIN REDUCER //

const eventsSlice = createSlice({
  name: 'events',

  initialState: initialState(),

  reducers: {
    getEventsFetchFirst,
    getEventsFetch,
    getEventsSuccess,
    getEventsFailure
  }
})

export const selectEvents = (state) => dataSelectors.selectData(state).events
export const selectEventsData = (state) => selectEvents(state).data
export const selectEventsStatus = (state) => selectEvents(state).status
export const selectEventsError = (state) => selectEvents(state).error
export const selectEvent = (date) => (state) => selectEventsData(state).find(event => event.date === date)
export const selectEventLatest = (state) => {
  const events = selectEventsData(state)
  return events.reduce((result, event) => {
    if (result === null) {
      return event
    }
    if (event.date.localeCompare(result.date) > 0) {
      return event
    }
    return result
  }, null)
}

eventsSlice.selectors = {
  selectEvents,
  selectEventsData,
  selectEventsStatus,
  selectEventsError,
  selectEvent,
  selectEventLatest
}

export const {
  actions,
  reducer,
  selectors
} = eventsSlice

export default eventsSlice
