import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibAboutMe } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav3 = [
  {
    component: CNavItem,
    name: 'Messaggi',
    to: '/messaggi/',
    icon: <CIcon icon={cibAboutMe} customClassName="nav-icon" />,
  },
]

export default _nav3
