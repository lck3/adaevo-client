import React, { useContext, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
} from '../icons'
import { Input, WindmillContext } from '@windmill/react-ui'
import { useAuth } from 'src/context/auth-context'

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext)
  const {logout} = useAuth()


  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500 opacity-0">
            <div className=" absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for Customer"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Notifications menu --> */}
          <li className="relative">
          <span>Good morning Luca</span>
          </li>
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          <li className="relative">
            <button
              className="rounded-full py-1 px-2 text-xs shadow-outline-purple focus:outline-none text-black"
              onClick={() => logout()}
              aria-label="Account"
              aria-haspopup="true"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
