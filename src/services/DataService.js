import { get } from 'lib/RestHelper'

import { actions as songActions } from 'store/data/songs'
import { actions as setActions } from 'store/data/sets'

import 'assets/data/sets.json'
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

export const getSets = async (dispatch) => {
  dispatch(setActions.getSetsFetchFirst())
  return get('http://localhost:8080/assets/data/sets.json')
    .then((result) => {
      console.log(JSON.parse(JSON.stringify(result)))
      result.data.sort(
        (set1, set2) => {
          const date1 = new Date(set1.date)
          console.log(date1)
          const date2 = new Date(set2.date)
          console.log(date2)
          return   date1.getTime() - date2.getTime()
        }
      )
      console.log(result)
      dispatch(setActions.getSetsSuccess(result))
    })
    .catch((error) => {
      dispatch(setActions.getSetsFailure({ error }))
    })
}

const DataService = {
  getSongs,
  getSets
}

export default DataService
