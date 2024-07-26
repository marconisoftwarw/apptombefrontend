import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../../services/user'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CForm } from '@coreui/react'
import sfondo from 'src/assets/sfondo.png'
import './App.css'
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
  const notify = (message) => toast(message)

  const loginfunction = async () => {
    var islogin = await loginUser(user, password)
    if (islogin === true) {
      var type = await localStorage.getItem('type')
      if (type === 'UTENTE') {
        navigate('/messaggi')
      } else if (type === 'ADMIN1') {
        navigate('/defunto')
      } else {
        navigate('/dashboard')
      }
    } else {
      notify('Errore: parametri non corretti')
    }
  }

  const changeTextUsername = (val) => {
    user = val.target.value
  }

  const changeTextPassword = (val) => {
    password = val.target.value
  }

  const followFunction = async () => {
    navigate('/follow')
  }

  return (
    <div
      style={{
        backgroundImage: `url(${sfondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CForm
        style={{
          width: '300px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <div
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '30px',
            padding: '20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1 className="custom-heading">Segui un defunto</h1>
          <p className="text-medium-emphasis" style={{ marginBottom: '20px' }}>
            Esegui il login
          </p>
          <input
            className="custom-textbox"
            type="text"
            placeholder="Username"
            onChange={changeTextUsername}
            style={{ marginBottom: '20px', width: '100%' }}
          />
          <input
            className="custom-textbox"
            type="password"
            placeholder="Password"
            onChange={changeTextPassword}
            style={{ marginBottom: '20px', width: '100%' }}
          />
          <button className="custom-button" onClick={loginfunction} style={{ width: '100%' }}>
            Login
          </button>
          <p></p>
          <button className="custom-button" onClick={followFunction} style={{ width: '100%' }}>
            Segui un defunto
          </button>
        </div>
      </CForm>
      <ToastContainer />
    </div>
  )
}

export default Login
