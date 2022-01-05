import React from 'react'

import './LinkList.less'

const LinkList = ({
  children,
}) => {
  return (
    <ul className='link-list'>
      {children}
    </ul>
  )
}

export default LinkList
