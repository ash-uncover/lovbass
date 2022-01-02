import React from 'react'

import {
  useParams,
  useSelector,
  useTranslation,
} from 'lib/hooks'

import {
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import {
  selectors as SetSelectors
} from 'store/data/sets'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

import Set from 'components/common/Set'

import './Sets.less'

const Sets = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<SetsList />} />
        <Route path=':setId' element={<SetsEntry />} />
      </Route>
    </Routes>
  )
}

const SetsList = () => {
  // Hooks
  const { t } = useTranslation()
  const sets = useSelector(SetSelectors.selectSetsData)

  // Rendering
  return [
    <h2 key='title' className='center'>{t('app:events.title')}</h2>,
    <ul key='list' className='sets-list'>
      {sets.map(set => (
        <li key={set.date} className='sets-list-entry'>
          <Link to={`/sets/${set.date}`} className='sets-list-link'>
            {set.date} - {set.place}
          </Link>
        </li>
      ))}
    </ul>
  ]
}

const SetsEntry = () => {
  // Hooks
  const { t } = useTranslation()
  const { setId } = useParams()
  let set = null
  if (setId === 'latest') {
    set = useSelector(SetSelectors.selectSetLatest)
  } else {
    set = useSelector(SetSelectors.selectSet(setId))
  }

  if (!set) {
    return (
      <Navigate to='/sets' />
    )
  }

  return (
    <div className='sets-entry'>
      <Link to='/sets'>
        <FontAwesomeIcon icon={faArrowLeft} />
        {t('app:events.entry.back')}
      </Link>
      <Set {...set} />
    </div>
  )
}

export default Sets
