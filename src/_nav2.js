import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibAboutMe } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav2 = [
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavItem,
    name: 'Defunti',
    to: '/defunto/',
    icon: <CIcon icon={cibAboutMe} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dialogo Utenti',
    to: '/dialogo/',
    icon: <CIcon icon={cibAboutMe} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Messaggi Utenti',
    to: '/messaggi/',
    icon: <CIcon icon={cibAboutMe} customClassName="nav-icon" />,
  },
]

export default _nav2
