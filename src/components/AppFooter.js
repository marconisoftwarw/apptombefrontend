import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
      <div className="ms-auto" style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
        <span className="me-1">Powered by</span>
        <a target="_blank" rel="noopener noreferrer">
          Siger S.R.L
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
