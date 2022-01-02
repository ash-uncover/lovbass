import React from 'react'

import {
  Outlet,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom'

import {
  useState,
  useTranslation,
} from 'lib/hooks'

import {
  StoreService,
} from 'services'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faAddressCard,
  faCalendarAlt,
  faHome,
  faMusic,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import Contact from 'components/app/contact/Contact'
import Home from 'components/app/home/Home'
import Sets from 'components/app/sets/Sets'
import Songs from 'components/app/songs/Songs'

import './App.less'

const App = () => {
  const songs = StoreService.useSongs()
  const sets = StoreService.useSets()

  const { t } = useTranslation()
  if (!songs.status.loaded || !sets.status.loaded) {
    return (
      <div>{t('app:loading')}</div>
    )
  }

  return (
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<AppContent />}>
          <Route index element={<Home />} />
          <Route path='songs/*' element={<Songs />}/>
          <Route path='sets/*' element={<Sets />} />
          <Route path='contact' element={<Contact />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </React.StrictMode>
  )
}

const AppHeader = () => {
  // HOOKS
  const [menuOpen, setMenuOpen] = useState((false))
  const { t } = useTranslation()

  // CALLBACKS

  const onMenuPress = () => {
    setMenuOpen(!menuOpen)
  }

  // RENDERING

  const menuClass = ['app-header dark']
  if (menuOpen) {
    menuClass.push('open')
  }

  return (
    <header className={menuClass.join(' ')}>
      <nav className='app-header-navigation dark'>
        <NavLink className='text app-header-item' to='/' onClick={onMenuPress}>
          <FontAwesomeIcon icon={faHome} />
          {t('app:home.title')}
        </NavLink>
        <span className='app-header-spacer' />
        <NavLink className='text app-header-item' to='/songs' onClick={onMenuPress}>
          <FontAwesomeIcon icon={faMusic} />
          {t('app:songs.title')}
        </NavLink>
        <NavLink className='text app-header-item' to='/sets' onClick={onMenuPress}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          {t('app:events.title')}
        </NavLink>
        <NavLink className='text app-header-item' to='/contact' onClick={onMenuPress}>
          <FontAwesomeIcon icon={faAddressCard} />
          {t('app:contact.title')}
        </NavLink>
      </nav>
      <div className='app-header-menu dark' onClick={onMenuPress}>
        <FontAwesomeIcon className='action-icon action-open' icon={faBars} />
        <FontAwesomeIcon className='action-icon action-close' icon={faTimes} />
      </div>
    </header>
  )
}

const AppContent = () => {
  return (
    <div className='app'>
      <AppHeader />
      <div className='app-content light'>
        <Outlet />
      </div>
      <AppFooter />
    </div>
  )
}

const AppFooter = () => {
  return (
    <footer className='app-footer std'>
      footer
    </footer>
  )
}

export default App
