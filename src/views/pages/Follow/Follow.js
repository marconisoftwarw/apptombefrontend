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
        <div style={{ width: 400, height: 400, backgroundColor: 'white', alignContent: 'center' }}>
          <div className="App">
            <h1 className="custom-heading">Segui un defunto</h1>
          </div>
          <p className="text-medium-emphasis">Seleziona il comune di Residenza</p>
          <p></p>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              placeholder="Nome defunto"
              autoComplete="Nome defunto"
              onChange={changeTextUsername}
            />
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput placeholder="Regione" autoComplete="Regione" onChange={changeTextRegione} />
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput placeholder="Citta" autoComplete="Citta" onChange={changeTextCitta} />
          </CInputGroup>

          <CRow>
            <CCol xs={6}>
              <button className="custom-button" onClick={() => search()}>
                Ricerca
              </button>
            </CCol>
          </CRow>
        </div>
      </CForm>
      <ToastContainer />
    </div>
  )
}

export default Follow
