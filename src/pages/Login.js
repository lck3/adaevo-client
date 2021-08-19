import React, { useEffect, useState } from 'react'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import { useAuth } from 'src/context/auth-context'

function Login() {
  const [userForm, setUserForm] = useState({username: undefined, password: undefined})
  const {login} = useAuth()

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" onChange={(e) => setUserForm({
                  ...userForm,
                  username: e.target.value
                })} />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" placeholder="***************" onChange={(e) => setUserForm({
                  ...userForm,
                  password: e.target.value
                })} />
              </Label>

              <Button className="mt-4" block onClick={() => login(userForm)}>
                Log in
              </Button>

              <hr className="my-8" />

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
