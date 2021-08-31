/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {useAsync} from '../utils/hooks'
import {FullPageSpinner, FullPageErrorFallback} from '../components/lib'
import {login as userLogin, getUser} from '../infrastructure/api/userAuthRequests'
import { handleRemoteOperationError } from 'src/ErrorHandler'
import '../i18n/config';
import { useTranslation } from 'react-i18next'

async function bootstrapAppData(lang: any) {
  
  let user = null
  user = await getUser().catch(err => {
    debugger
    handleRemoteOperationError(new Error(lang(`serverResponse.${err.response.data.code}`)))
  })
  
  return user
}

const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

function AuthProvider(props: any) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  
  const { t, ready } = useTranslation(undefined , { useSuspense: false });

  
  React.useEffect(() => {
    if (!ready) return
    const appDataPromise = bootstrapAppData(t)
    run(appDataPromise)
  }, [run, t, ready])

  const login = React.useCallback(
    (form: any) => userLogin(form)
      .then(() => {
        return getUser()
      })
      .then((user: any) => {
        setData(user)
      }),
    [setData],
  )
  /**
   * utility function to clear authentication properties without redirect
   */
  const clearStorageAuthItems = React.useCallback( () => {
    sessionStorage.removeItem('adaevo_access_token')
    localStorage.removeItem('adaevo_refresh_token')
    setData(null)
  }, [setData]
  )

  const logout = React.useCallback(() => {
    clearStorageAuthItems()
    setData(null)
    window.location.replace('/login')
  }, [clearStorageAuthItems, setData])


  const value = React.useMemo(
    () => ({user, login, logout, clearStorageAuthItems}),
    [clearStorageAuthItems, login, logout, user],
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}


export {AuthProvider, useAuth}
