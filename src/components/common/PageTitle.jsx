import React from 'react'

import './PageTitle.less'

const PageTitle = ({
  text,
}) => {
  return (
    <h2 className='page-title'>
      {text}
    </h2>
  )
}

export default PageTitle
