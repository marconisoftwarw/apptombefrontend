import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sfondo from 'src/assets/sfondo.png'
import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginUser } from '../../../services/user'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

const Login = () => {
  const navigate = useNavigate()
  let user, password
  const { height } = useWindowDimensions()
  const notify = (message) => toast(message)

  const loginfunction = async () => {
    var islogin = await loginUser(user, password)
    if (islogin == true) {
      var type = await localStorage.getItem('type')
      if (type == 'UTENTE') {
        navigate('/messaggi')
      } else if (type == 'ADMIN1') {
        navigate('/defunto')
      } else {
        navigate('/dashboard')
      }
    } else {
      notify('Errore: parametri non corretti')
    }
  }

  const followFunction = async () => {
    navigate('/follow')
  }

  const changeTextUsername = (val) => {
    user = val.target.value
  }

  const changeTextPassword = (val) => {
    password = val.target.value
  }
  return (
    <div
      style={{
        backgroundImage: `url(${sfondo})`,
        height: '100%',
      }}
    >
      <div style={{ height: height, width: 400, marginLeft: 400 }}>
        <h1>Login</h1>
        <p className="text-medium-emphasis">Sign In to your account</p>

        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormInput
            placeholder="Username"
            autoComplete="username"
            onChange={changeTextUsername}
          />
        </CInputGroup>
        <CInputGroup className="mb-4">
          <CInputGroupText>
            <CIcon icon={cilLockLocked} />
          </CInputGroupText>
          <CFormInput
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={changeTextPassword}
          />
        </CInputGroup>
        <CRow>
          <CCol xs={6}>
            <CButton color="primary" className="px-4" onClick={() => loginfunction()}>
              Login
            </CButton>
            <p></p>
            <CButton color="primary" className="px-6" onClick={() => followFunction()}>
              Segui un defunto
            </CButton>
          </CCol>
        </CRow>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
