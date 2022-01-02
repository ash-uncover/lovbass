import React from 'react'

import './Set.less'

const Set = ({
  date,
  place,
  songs,
}) => {
  return (
    <div className='set'>
      <h2 className='set-title'>{date} - {place} - {songs.length}</h2>
      <ul>
        {songs.map((song) => <li key={song.name}><SetSong {...song} /></li>)}
      </ul>
    </div>
  )
}

const SetSong = ({
  name,
  artist
}) => {
  return (
    <span className='set-song-entry'>{artist} - {name}</span>
  )
}

export default Set
