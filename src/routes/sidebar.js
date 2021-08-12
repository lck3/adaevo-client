/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    icon: 'FormsIcon',
    name: 'Campaign',
    routes: [
      {
        path: '/app/campaign',
        name: 'All Campaigns',
      },      
      {
        path: '/app/add-campaign',
        name: 'Create a Campaign',
      },      
    ]
  },
  {
    icon: 'PeopleIcon',
    name: 'Customers',
    routes: [
      {
        path: '/app/customer',
        name: 'All Customers',
      },      
      {
        path: '/app/add-customer',
        name: 'Add a Customer',
      },      
    ]
  }
]

export default routes
