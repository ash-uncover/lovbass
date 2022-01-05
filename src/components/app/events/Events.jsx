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
  selectors as EventSelectors
} from 'store/data/events'

import {
  selectors as SongSelectors,
} from 'store/data/songs'

import LinkBack from 'components/common/LinkBack'
import LinkList from 'components/common/LinkList'
import LinkListItem from 'components/common/LinkListItem'
import PageTitle from 'components/common/PageTitle'
import Song from 'components/common/Song'

const Events = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<EventsList />} />
        <Route path=':eventId'>
          <Route index element={<EventsEntry />} />
          <Route path=':songId' element={<EventsEntrySong />} />
        </Route>
      </Route>
    </Routes>
  )
}

const EventsList = () => {
  // Hooks
  const { t } = useTranslation()
  const events = useSelector(EventSelectors.selectEventsData)

  // Rendering
  return [
    <PageTitle
      key='title'
      text={t('app:events.title')}
    />,
    <LinkList key='list'>
      {events.map(event => (
        <LinkListItem
          key={event.date}
          to={`/events/${event.date}`}
          text={`${event.date} - ${event.place}`}
        />
      ))}
    </LinkList>
  ]
}

const EventsEntry = () => {
  // Hooks
  const { t } = useTranslation()
  const { eventId } = useParams()
  let event = null
  if (eventId === 'latest') {
    event = useSelector(EventSelectors.selectEventLatest)
  } else {
    event = useSelector(EventSelectors.selectEvent(eventId))
  }

  if (!event) {
    return (
      <Navigate to='/events' />
    )
  }

  return (
    <div className='events-entry'>
      { eventId !== 'latest' ? (
        <LinkBack
          to='/events'
          text={t('app:events.entry.back')}
        />
      ) : null}
      <PageTitle
        key='title'
        text={`${event.date} - ${event.place} - ${event.songs.length}`}
      />
      <LinkList>
        {event.songs.map((song) => {
          return (
            <LinkListItem
              key={song}
              to={`/events/${event.date}/${song}`}
              text={song}
            />
          )
        })}
      </LinkList>
    </div>
  )
}

const EventsEntrySong = () => {
  const { t } = useTranslation()
  const { eventId, songId } = useParams()
  const song = useSelector(SongSelectors.selectSong(songId))
  return [
    <LinkBack
      key='link'
      to={`/events/${eventId}`}
      text={t('app:events.entry.song.back')}
    />,
    <Song key='song' {...song} />
  ]
}

export default Events
