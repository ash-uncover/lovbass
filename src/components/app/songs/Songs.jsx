import React from 'react'

import {
  useSelector
} from 'lib/hooks'

import {
  selectors as SongSelectors
} from 'store/data/songs'

import {
  Link
} from 'react-router-dom'

const Songs = () => {
  // Hooks
  const songs = useSelector(SongSelectors.selectSongsData)

  return (
    <div>
      <div>Songs</div>
      <ul>
        {songs.map(song => (
          <li key={song.name}>
            <Link to={`/songs/${song.name}`}>
            {song.artist} - {song.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Songs
