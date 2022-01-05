import React from 'react'

import {
  useTranslation,
} from 'lib/hooks'

import PageTitle from 'components/common/PageTitle'

const Home = () => {
  // Hooks
  const { t } = useTranslation()

  // Rendering
  return (
    <PageTitle text={t('app:home.title')} />
  )
}

export default Home
