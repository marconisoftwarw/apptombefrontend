/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { CForm } from '@coreui/react'
import { searchbyname as searchdefunto } from '../../../services/defunto'
import { getList as getListCimitero } from '../../../services/cimitero'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import sfondo from 'src/assets/sfondo.png'
import './App.css'

const Follow = () => {
  const navigate = useNavigate()

  // Storing state values
  const [user, setUser] = useState('')
  const [cognome, setCognome] = useState('')
  const [regione, setRegione] = useState('')
  const [citta, setCitta] = useState('')
  const [dataMorte, setDataMorte] = useState('') // New state for data di morte
  const [objectList, setObjectList] = useState([])

  // Function to handle search
  const search = async () => {
    // Check if mandatory fields are filled
    if (!user || !cognome || !citta) {
      toast.error('Nome, cognome e città sono obbligatori!')
      return
    }

    try {
      const defunti = await searchdefunto(user, cognome, regione, citta, dataMorte) // Pass the new fields
      const cimiteri = await getListCimitero()

      const results = defunti.map((defunto) => {
        const cimitero = cimiteri.find((c) => c.id === defunto.idCimitero)
        return {
          id: defunto.id,
          nome: defunto.nome,
          cognome: defunto.cognome,
          cimitero: cimitero ? cimitero.citta : 'Non disponibile',
        }
      })

      setObjectList(results)
      navigate('/follow/user', { state: { objectList: results } })
    } catch (error) {
      toast.error('Si è verificato un errore durante la ricerca!')
    }
  }

  // Handlers for input changes
  const changeTextUsername = (val) => {
    setUser(val.target.value)
  }

  const changeTextCognome = (val) => {
    setCognome(val.target.value)
  }

  const changeTextRegione = (val) => {
    setRegione(val.target.value)
  }

  const changeTextCitta = (val) => {
    setCitta(val.target.value)
  }

  const changeTextDataMorte = (val) => {
    setDataMorte(val.target.value)
  }

  return (
    <div
      style={{
        backgroundImage: `url(${sfondo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CForm style={{ width: 400, marginLeft: 100, height: 1000, marginTop: 500, marginRight: 0 }}>
        <div
          style={{
            width: 400,
            height: 500,
            backgroundColor: 'white',
            alignContent: 'center',
            borderRadius: '40px',
            marginBottom: '20px',
            padding: '5px', // Added padding for spacing
          }}
        >
          <div className="App">
            <div style={{ marginLeft: '100px' }}>
              <h2> Segui un defunto</h2>
            </div>
            <div style={{ alignContent: 'center' }}>
              <input
                className="custom-textbox"
                type="text"
                placeholder="Nome defunto"
                onChange={changeTextUsername}
                style={{ marginTop: '10px', width: '200px', marginLeft: '80px' }} // Decreased the margin
              />
              <p></p>
              <input
                className="custom-textbox"
                type="text"
                placeholder="Cognome defunto"
                onChange={changeTextCognome}
                style={{ marginTop: '60px', width: '200px', marginLeft: '80px' }} // Decreased the margin
              />
              <p></p>
              <input
                className="custom-textbox"
                type="text"
                placeholder="Regione"
                onChange={changeTextRegione}
                style={{ marginTop: '110px', width: '200px', marginLeft: '80px' }} // Decreased the margin
              />
              <p></p>
              <input
                className="custom-textbox"
                type="text"
                placeholder="Città"
                onChange={changeTextCitta}
                style={{ marginTop: '160px', width: '200px', marginLeft: '80px' }} // Decreased the margin
              />
              <p></p>
              <input
                className="custom-textbox"
                type="date"
                placeholder="Data di Morte"
                onChange={changeTextDataMorte}
                style={{ marginTop: '210px', width: '200px', marginLeft: '80px' }} // Decreased the margin
              />
              <p></p>
              <button
                className="custom-button"
                onClick={() => search()}
                style={{ marginTop: '300px', marginRight: '10px' }}
              >
                Ricerca
              </button>
            </div>
          </div>
        </div>
      </CForm>
      <ToastContainer />
    </div>
  )
}

export default Follow
