import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const Customer = lazy(() => import('../pages/Customer'))
const Campaign = lazy(() => import('../pages/Campaign'))
const AddCampaign = lazy(() => import('../pages/AddCampaign'))
const AddCustomer = lazy(() => import('../pages/AddCustomer'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/add-campaign',
    component: AddCampaign,
  },
  {
    path: '/add-customer',
    component: AddCustomer,
  },
  {
    path: '/campaign',
    component: Campaign,
  },
  {
    path: '/customer',
    component: Customer,
  },
  {
    path: '/404',
    component: Page404,
  },
]

export default routes
