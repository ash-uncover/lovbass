import React from 'react'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import './LinkBack.less'

const LinkBack = ({
  to,
  text,
}) => {
  return (
    <Link className='link-back' to={to}>
      <FontAwesomeIcon icon={faArrowLeft} />
      {text}
    </Link>
  )
}

export default LinkBack
