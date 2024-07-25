/* eslint-disable no-unused-vars */
import React from 'react'
import { CButton, CCol, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { searchbyname as searchdefunto } from '../../../services/defunto'
import { getList as getListCimitero } from '../../../services/cimitero'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import sfondo from 'src/assets/sfondo.png'
import './App.css'
const Follow = () => {
  const navigate = useNavigate()

  let user, Regione, citta

  var objectList = [{ id: '', nome: '', cognome: '', cimitero: '' }]

  const search = async () => {
    var defunti = await searchdefunto(user, Regione, citta)
    var cimiteri = await getListCimitero()

    objectList = []
    for (var i = 0; i < defunti.length; i++) {
      var id = defunti[i].id
      var nome = defunti[i].nome
      var cognome = defunti[i].cognome
      var citta = ''
      for (var i2 = 0; i2 < cimiteri.length; i2++) {
        if (cimiteri[i2].id == defunti[i].idCimitero) {
          citta = cimiteri[i2].citta
        }
      }
      objectList.push({
        id: id,
        nome: nome,
        cognome: cognome,
        cimitero: citta,
      })
    }

    navigate('/follow/user', { state: { objectList: objectList } })
  }

  const changeTextUsername = (val) => {
    user = val.target.value
  }

  const changeTextRegione = (val) => {
    Regione = val.target.value
  }
  const changeTextCitta = (val) => {
    citta = val.target.value
  }

  return (
    <div
      style={{
        backgroundImage: `url(${sfondo})`,
        backgroundSize: 'cover',
        height: '100%',
      }}
    >
      <CForm style={{ width: 400, marginLeft: 400, height: 1000 }}>
        <div
          style={{
            width: 400,
            height: 400,
            backgroundColor: 'white',
            alignContent: 'center',
            borderRadius: '30px',
            marginBottom: '20px',
          }}
        >
          <div className="App">
            <h1 className="custom-heading">Segui un defunto</h1>

            <p className="text-medium-emphasis" style={{ marginLeft: '30px' }}>
              Seleziona il comune di Residenza
            </p>

            <input
              className="custom-textbox"
              type="text"
              placeholder="Nome defunto"
              onChange={changeTextUsername}
              style={{ marginTop: '30px' }}
            />
            <p></p>
            <input
              className="custom-textbox"
              type="text"
              placeholder="Regione"
              onChange={changeTextRegione}
              style={{ marginTop: '90px' }}
            />
            <input
              className="custom-textbox"
              type="text"
              placeholder="Citta"
              onChange={changeTextCitta}
              style={{ marginTop: '150px' }}
            />
            <button
              className="custom-button"
              onClick={() => search()}
              style={{ marginTop: '200px' }}
            >
              Ricerca
            </button>
          </div>
        </div>
      </CForm>
      <ToastContainer />
    </div>
  )
}

export default Follow
