import {
  useDispatch,
  useEffect,
  useSelector
} from 'lib/hooks'

import {
  DataService
} from 'services'

import {
  selectors as SongSelectors
} from 'store/data/songs'

import {
  selectors as SetSelectors
} from 'store/data/sets'

const StoreService = {}

const useStoreData = (
  selectorData,
  selectorStatus,
  selectorError,
  apiCall
) => {
  const dispatch = useDispatch()

  const data = useSelector(selectorData)
  const status = useSelector(selectorStatus)
  const error = useSelector(selectorError)

  useEffect(() => {
    if (!status.loaded && !status.loading) {
      apiCall(dispatch)
    }
  })

  return {
    data,
    status,
    error
  }
}

StoreService.useSongs = () => {
  return useStoreData(
    SongSelectors.selectSongsData,
    SongSelectors.selectSongsStatus,
    SongSelectors.selectSongsError,
    DataService.getSongs
  )
}

StoreService.useSets = () => {
  return useStoreData(
    SetSelectors.selectSetsData,
    SetSelectors.selectSetsStatus,
    SetSelectors.selectSetsError,
    DataService.getSets
  )
}

export default StoreService
