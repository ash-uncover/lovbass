import React from 'react'

import {
  useParams,
  useSelector,
  useTranslation,
} from 'lib/hooks'

import {
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import {
  selectors as SetSelectors
} from 'store/data/sets'

import {
  selectors as SongSelectors,
} from 'store/data/songs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

import Song from 'components/common/Song'

import './Sets.less'

const Sets = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<SetsList />} />
        <Route path=':setId'>
          <Route index element={<SetsEntry />} />
          <Route path=':songId' element={<SetsEntrySong />} />
        </Route>
      </Route>
    </Routes>
  )
}

const SetsList = () => {
  // Hooks
  const { t } = useTranslation()
  const sets = useSelector(SetSelectors.selectSetsData)

  // Rendering
  return [
    <h2 key='title' className='center'>{t('app:events.title')}</h2>,
    <ul key='list' className='sets-list'>
      {sets.map(set => (
        <li key={set.date} className='sets-list-entry'>
          <Link to={`/sets/${set.date}`} className='sets-list-link'>
            {set.date} - {set.place}
          </Link>
        </li>
      ))}
    </ul>
  ]
}

const SetsEntry = () => {
  // Hooks
  const { t } = useTranslation()
  const { setId } = useParams()
  let set = null
  if (setId === 'latest') {
    set = useSelector(SetSelectors.selectSetLatest)
  } else {
    set = useSelector(SetSelectors.selectSet(setId))
  }

  if (!set) {
    return (
      <Navigate to='/sets' />
    )
  }

  return (
    <div className='sets-entry'>
      { setId !== 'latest' ? (
        <Link to='/sets'>
          <FontAwesomeIcon icon={faArrowLeft} />
          {t('app:events.entry.back')}
        </Link>
      ) : null}
      <div className='set'>
        <h2 className='set-title'>{set.date} - {set.place} - {set.songs.length}</h2>
        <ul>
          {set.songs.map((song) => {
            return (
              <li className='set-song-entry' key={song}>
                <Link className='set-song-link' to={`/sets/${set.date}/${song}`}>
                  {song}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const SetsEntrySong = () => {
  const { t } = useTranslation()
  const { setId, songId } = useParams()
  const song = useSelector(SongSelectors.selectSong(songId))
  return (
    <div className='sets-entry-song'>
      <Link to={`/sets/${setId}`}>
        <FontAwesomeIcon icon={faArrowLeft} />
        {t('app:events.entry.song.back')}
      </Link>
      <Song {...song} />
    </div>
  )
}

export default Sets
