import React from 'react'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader style={{ backgroundColor: 'rgb(176, 219, 240)' }} />
        <div className="body flex-grow-1 px-3" style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
          <AppContent style={{ backgroundColor: 'rgb(176, 219, 240)' }}></AppContent>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
