import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sfondo from 'src/assets/accedi.png'
import { loginUser } from '../../../services/user'
import { toast } from 'react-toastify'
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

const Enter = () => {
  const navigate = useNavigate()
  const { height, width } = useWindowDimensions()

  return (
    <div
      style={{
        backgroundImage: `url(${sfondo})`,
      }}
      onClick={() => navigate('/login')}
    >
      <div style={{ height: height, width: width }}></div>
    </div>
  )
}

export default Enter
