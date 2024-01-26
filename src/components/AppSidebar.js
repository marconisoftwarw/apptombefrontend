/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import imagelogo from '../assets/logo.png'
import { AppSidebarNav } from './AppSidebarNav'

import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import navigation from '../_nav'
import navigation2 from '../_nav2'
import navigation3 from '../_nav3'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const getMenu = () => {
    if (localStorage.getItem('type') == 'ADMIN' || localStorage.getItem('type') == 'SUPERUSER') {
      return <AppSidebarNav items={navigation} />
    } else if (localStorage.getItem('type') == 'ADMIN1') {
      return <AppSidebarNav items={navigation2} />
    } else if (localStorage.getItem('type') == 'UTENTE') {
      return <AppSidebarNav items={navigation3} />
    }
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      style={{ background: '#2B87BB' }}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand to="/">
        <img src={imagelogo} width={255} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>{getMenu()}</SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
