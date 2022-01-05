import React from 'react'

import {
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

import LinkBack from 'components/common/LinkBack'
import LinkList from 'components/common/LinkList'
import LinkListItem from 'components/common/LinkListItem'
import PageTitle from 'components/common/PageTitle'
import Song from 'components/common/Song'

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
    <PageTitle
      key='title'
      text={t('app:songs.title')}
    />,
    <LinkList key='list'>
      {songs.map(song => (
        <LinkListItem
          key={song.name}
          to={`/songs/${song.name}`}
          text={`${song.artist} - ${song.name}`}
        />
      ))}
    </LinkList>
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
      <LinkBack
        to='/songs'
        text={t('app:songs.entry.back')}
      />
      <Song {...song} />
    </div>
  )
}

export default Songs
