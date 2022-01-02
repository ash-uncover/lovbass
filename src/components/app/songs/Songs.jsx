import React from 'react'

import {
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import {
  useParams,
  useSelector,
  useTranslation,
} from 'lib/hooks'

import {
  selectors as SongSelectors,
} from 'store/data/songs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

import Song from 'components/common/Song'

import './Songs.less'

const Songs = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<SongsList />} />
        <Route path=':songId' element={<SongsEntry />} />
      </Route>
    </Routes>
  )
}

const SongsList = () => {
  // Hooks
  const { t } = useTranslation()
  const songs = useSelector(SongSelectors.selectSongsData)

  // Rendering
  return [
    <h2 key='title' className='center'>{t('app:songs.title')}</h2>,
    <ul key='list' className='songs-list'>
      {songs.map(song => (
        <li key={song.name} className='songs-list-entry'>
          <Link to={`/songs/${song.name}`} className='songs-list-link'>
            {song.artist} - {song.name}
          </Link>
        </li>
      ))}
    </ul>
  ]
}

const SongsEntry = () => {
  // Hooks
  const { t } = useTranslation()
  const { songId } = useParams()
  const song = useSelector(SongSelectors.selectSong(songId))

  if (!song) {
    return (
      <Navigate to='/songs' />
    )
  }

  return (
    <div className='songs-entry'>
      <Link to='/songs'>
        <FontAwesomeIcon icon={faArrowLeft} />
        {t('app:songs.entry.back')}
      </Link>
      <Song {...song} />
    </div>
  )
}

export default Songs
