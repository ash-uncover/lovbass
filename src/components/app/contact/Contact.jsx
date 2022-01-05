import React from 'react'

import {
  useTranslation,
} from 'lib/hooks'

import PageTitle from 'components/common/PageTitle'

const Contact = () => {
  // Hooks
  const { t } = useTranslation()

  // Rendering
  return (
    <PageTitle text={t('app:contact.title')} />
  )
}

export default Contact
