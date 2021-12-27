import React from 'react'

import {
  useSelector
} from 'lib/hooks'

import {
  selectors as SetSelectors
} from 'store/data/sets'

const Sets = () => {
  // Hooks
  const sets = useSelector(SetSelectors.selectSetsData)

  return (
    <div>
      <div>Sets</div>
      <ul>
        {sets.map(set => (
          <li key={set.name}>
            {set.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sets
