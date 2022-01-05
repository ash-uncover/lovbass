import { get } from 'lib/RestHelper'

import { actions as songActions } from 'store/data/songs'
import { actions as setActions } from 'store/data/events'

import 'assets/data/events.json'
import 'assets/data/songs.json'

export const getSongs = async (dispatch) => {
  dispatch(songActions.getSongsFetchFirst())
  return get('http://localhost:8080/assets/data/songs.json')
    .then((result) => {
      result.data.sort(
        (song1, song2) => {
          return song2.name.localeCompare(song1.name)
        }
      )
      dispatch(songActions.getSongsSuccess(result))
    })
    .catch((error) => {
      dispatch(songActions.getSongsFailure({ error }))
    })
}

export const getEvents = async (dispatch) => {
  dispatch(setActions.getEventsFetchFirst())
  return get('http://localhost:8080/assets/data/events.json')
    .then((result) => {
      result.data.sort(
        (event1, event2) => {
          const date1 = new Date(event1.date)
          console.log(date1)
          const date2 = new Date(event2.date)
          console.log(date2)
          return   date1.getTime() - date2.getTime()
        }
      )
      dispatch(setActions.getEventsSuccess(result))
    })
    .catch((error) => {
      dispatch(setActions.getEventsFailure({ error }))
    })
}

const DataService = {
  getSongs,
  getEvents
}

export default DataService
