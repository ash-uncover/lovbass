import React from 'react'

import {
  useDispatch,
  useEffect,
  useSelector
} from 'lib/hooks'

import {
  actions as AppActions,
  selectors as AppSelectors
} from 'store/app'

import App from 'components/app/App'

const Root = () => {
  // Hooks
  const dispatch = useDispatch()

  const appStarted = useSelector(AppSelectors.selectAppStart)

  useEffect(() => {
    if (!appStarted) {
      dispatch(AppActions.appStart())
    }
  })

  if (!appStarted) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <App />
  )
}

export default Root
