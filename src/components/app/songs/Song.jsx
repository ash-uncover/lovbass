import React from 'react'

import {
  useParams,
  useSelector
} from 'lib/hooks'

import {
  selectors as SongSelectors
} from 'store/data/songs'

import {
  Link,
  Navigate
} from 'react-router-dom'

const Song = () => {
  // Hooks
  const { songId } = useParams()
  const song = useSelector(SongSelectors.selectSong(songId))

  if (!song) {
    return (
      <Navigate to='/songs' />
    )
  }

  return (
    <div className='song'>
      <div>
        <Link to='/songs'>
          Back to songs
        </Link>
      </div>
      SONG
      <div>{song.name}</div>
      {song.lyrics.split('\n\n').map(
        (p, pIndex) => {
          return (
            <p key={pIndex}>
              {p.split('\n').map((line, lineIndex) => <div key={lineIndex}>{line}</div>)}
            </p>
          )
        }
      )}
    </div>
  )
}

export default Song
