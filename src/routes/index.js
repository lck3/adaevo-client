import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Page404 = lazy(() => import('../pages/404'))
const Customer = lazy(() => import('../pages/customers/Customer'))
const Campaign = lazy(() => import('../pages/campaigns/Campaign'))
const AddCampaign = lazy(() => import('../pages/campaigns/AddCampaign'))
const UpdateCampaign = lazy(() => import('../pages/campaigns/UpdateCampaign'))
const AddCustomer = lazy(() => import('../pages/customers/AddCustomer'))
const EditCustomer = lazy(() => import('../pages/customers/EditCustomer'))

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
    path: '/campaign',
    component: Campaign,
  },
  {
    path: '/update-campaign/:id',
    component: UpdateCampaign,
  },
  {
    path: '/add-customer',
    component: AddCustomer,
  },
  {
    path: '/update-customer/:id',
    component: EditCustomer,
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
