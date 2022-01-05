import React from 'react'

import { Link } from 'react-router-dom'

import './LinkListItem.less'

const LinkListItem = ({
  to,
  text,
}) => {
  return (
    <li className='link-list-item'>
      <Link className='link-list-item-link' to={to}>
        {text}
      </Link>
    </li>
  )
}

export default LinkListItem
