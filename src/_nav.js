/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import CIcon from '@coreui/icons-react'
import logo from './assets/dashboard.png'
import menulogo from './assets/menu.png'
import { cibAboutMe, cibAbstract, cibBuysellads, cilDrop } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
const _nav = [
  {
    component: CNavItem,
    name: '',
    to: '/dashboard',
    icon: <img src={logo} width={250} />,
  },
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavItem,
    name: 'Cimiteri',
    to: '/lista/cimiteri',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Urne',
    to: '/base/tables/totem',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Totem',
    to: '/base/tables/totem/hardware',
    icon: <CIcon icon={cibAbstract} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Acquisto',
    to: '/acquisto/',
    icon: <CIcon icon={cibBuysellads} customClassName="nav-icon" />,
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
    name: 'messaggi',
    to: '/messaggi/',
    icon: <CIcon icon={cibAboutMe} customClassName="nav-icon" />,
  },
]

export default _nav
