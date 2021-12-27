import { get } from 'lib/RestHelper'

import { actions as songActions } from 'store/data/songs'
import { actions as setActions } from 'store/data/sets'

export const getSongs = async (dispatch) => {
  dispatch(songActions.getSongsFetch())
  return new Promise((resolve, reject) => {
    resolve({
      data: [
        {
          name: 'Song 1',
          artist: 'artist 1',
          lyrics: `
          hello
          my love
          is standing still

          on the miror
          `
        },
        {
          name: 'Song 2',
          artist: 'artist 2',
          lyrics: `
          are you still there
          oh there you are
          `
        }
      ]
    })
  })
    .then((result) => {
      console.log(result)
      dispatch(songActions.getSongsSuccess(result))
    })
    .catch((error) => {
      dispatch(songActions.getSongsFailure({ error }))
    })
}

export const getSets = async (dispatch) => {
  dispatch(setActions.getSetsFetch())
  return new Promise((resolve, reject) => {
    resolve({
      data: [
        {
          name: 'Set 1'
        },
        {
          name: 'Set 2'
        }
      ]
    })
  })
    .then((result) => {
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
