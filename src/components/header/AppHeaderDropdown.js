import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
} from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import logo from './../../assets/usericon.png'
import { NavLink } from 'react-router-dom'

const AppHeaderDropdown = () => {
  return (
    <>
      <CNavLink to="/login" component={NavLink}>
        Logout
      </CNavLink>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar src={logo} size="md" />
        </CDropdownToggle>

        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
          <CDropdownDivider />

          <CDropdownItem href="#">
            <CIcon icon={cilLockLocked} className="me-2" />
            <CNavLink to="/login">LogOut</CNavLink>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
