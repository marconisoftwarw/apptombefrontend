import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../../services/user'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CForm } from '@coreui/react'
import sfondo from 'src/assets/sfondo.png'
import WebFont from 'webfontloader'
import './App.css'

const Login = () => {
  const navigate = useNavigate()
  let user, password
  const notify = (message) => toast(message)

  useEffect(() => {
    WebFont.load({
      google: { families: ['Red Hat Text:300', 'sans-serif'] },
    })
  }, [])

  const loginfunction = async () => {
    const islogin = await loginUser(user, password)
    if (islogin === true) {
      const type = await localStorage.getItem('type')
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
          width: '350px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1 className="custom-heading">Segui un defunto</h1>
          <p className="text-medium-emphasis" style={{ marginBottom: '20px', textAlign: 'center' }}>
            Esegui il login
          </p>
          <input
            className="custom-textbox"
            type="text"
            placeholder="Username"
            onChange={changeTextUsername}
            style={{ marginBottom: '15px', width: '100%' }}
          />
          <input
            className="custom-textbox"
            type="password"
            placeholder="Password"
            onChange={changeTextPassword}
            style={{ marginBottom: '15px', width: '100%' }}
          />
          <button
            className="custom-button"
            onClick={loginfunction}
            style={{ marginBottom: '10px' }}
          >
            Login
          </button>
          <button className="custom-button" onClick={followFunction}>
            Segui un defunto
          </button>
        </div>
      </CForm>
      <ToastContainer />
    </div>
  )
}

export default Login
