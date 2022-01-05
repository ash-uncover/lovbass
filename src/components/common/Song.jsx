import React from 'react'

import './Song.less'

const Song = ({
  artist,
  name,
  lyrics,
}) => {
  return (
    <div className='song'>
      <h2 className='song-title'>{artist} - {name}</h2>
      {lyrics.map((p, pIndex) => <SongParagraph text={p} key={pIndex} />)}
    </div>
  )
}

const SongParagraph = ({
  text
}) => {
  return (
    <p className='song-paragraph'>
      {text.map((line, lineIndex) => <SongLine key={lineIndex} text={line} />)}
    </p>
  )
}

const SongLine = ({
  text
}) => {
  return (
    <span className='song-line'>{text}<br/></span>
  )
}

export default Song
