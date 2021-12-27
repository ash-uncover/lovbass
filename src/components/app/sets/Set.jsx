import React from 'react'

import {
  useParams,
  useSelector
} from 'lib/hooks'

import {
  selectors as SetSelectors
} from 'store/data/sets'

const Set = () => {
  // Hooks
  const { setId } = useParams()
  const set = useSelector(SetSelectors.selectSet(setId))

  return (
    <div>
      SET
      <div>{set.name}</div>
    </div>
  )
}

export default Set
