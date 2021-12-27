import React from 'react'

import {
  Outlet,
  Navigate,
  NavLink,
  Route,
  Routes
} from 'react-router-dom'

import {
  StoreService
} from 'services'

import Contact from 'components/app/contact/Contact'
import Sets from 'components/app/sets/Sets'
import Set from 'components/app/sets/Set'
import Songs from 'components/app/songs/Songs'
import Song from 'components/app/songs/Song'

import './App.less'

const App = () => {
  const songs = StoreService.useSongs()
  const sets = StoreService.useSets()

  if (!songs.status.loaded || !sets.status.loaded) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<AppContent />}>
          <Route index element={<div>home</div>} />
          <Route path='songs' element={<Songs />}/>
          <Route path='songs/:songId' element={<Song />} />
          <Route path='sets' element={<Sets />}>
            <Route path=':setId' element={<Set />} />
          </Route>
          <Route path='contact' element={<Contact />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </React.StrictMode>
  )
}

const AppHeader = () => {
  return (
    <header className='app-header dark'>
      <nav className='app-header-container'>
        <NavLink className='text app-header-item' to='/'>
          Home
        </NavLink>
        <span className='app-header-spacer' />
        <NavLink className='text app-header-item' to='/songs'>
          Songs
        </NavLink>
        <NavLink className='text app-header-item' to='/sets'>
          Sets
        </NavLink>
        <NavLink className='text app-header-item' to='/contact'>
          Contact
        </NavLink>
      </nav>
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
