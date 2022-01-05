import React from 'react'

import {
  useParams,
  useSelector,
  useTranslation,
} from 'lib/hooks'

import {
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

import LinkBack from 'components/common/LinkBack'
import LinkList from 'components/common/LinkList'
import LinkListItem from 'components/common/LinkListItem'
import PageTitle from 'components/common/PageTitle'
import Song from 'components/common/Song'

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
    <PageTitle
      key='title'
      text={t('app:events.title')}
    />,
    <LinkList key='list'>
      {sets.map(set => (
        <LinkListItem
          key={set.date}
          to={`/sets/${set.date}`}
          text={`${set.date} - ${set.place}`}
        />
      ))}
    </LinkList>
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
        <LinkBack
          to='/sets'
          text={t('app:events.entry.back')}
        />
      ) : null}
      <PageTitle
        key='title'
        text={`${set.date} - ${set.place} - ${set.songs.length}`}
      />
      <LinkList>
        {set.songs.map((song) => {
          return (
            <LinkListItem
              key={song}
              to={`/sets/${set.date}/${song}`}
              text={song}
            />
          )
        })}
      </LinkList>
    </div>
  )
}

const SetsEntrySong = () => {
  const { t } = useTranslation()
  const { setId, songId } = useParams()
  const song = useSelector(SongSelectors.selectSong(songId))
  return (
    <div className='sets-entry-song'>
      <LinkBack
        to={`/sets/${setId}`}
        text={t('app:events.entry.song.back')}
      />
      <Song {...song} />
    </div>
  )
}

export default Sets
