import React from 'react'
import { useNavigate } from 'react-router-dom'
import sfondo from 'src/assets/accedi.png'
import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginUser } from '../../../services/user'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useState, useEffect } from 'react'

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

const Enter = () => {
  const navigate = useNavigate()
  let user, password
  const { height, width } = useWindowDimensions()
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
      }}
    >
      <div style={{ height: height, width: width }}></div>
    </div>
  )
}

export default Enter
