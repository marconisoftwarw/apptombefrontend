import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { cilUser } from '@coreui/icons'
import { follow } from 'src/services/defunto'
import './App.css'

const FollowTables = () => {
  const notify = (message) => toast(message)
  const navigate = useNavigate()
  const { state } = useLocation()
  const { objectList } = state
  var name, surname, email

  const followUser = async (item) => {
    // Validazione campi
    if (!name || !surname || !email) {
      notify('Per favore compila Nome, Cognome ed Email prima di proseguire.')
      return
    }

    // Chiamata al servizio
    if ((await follow(name, surname, email, item.nome + ' ' + item.cognome, item.id)) === true) {
      notify('Registrazione follow avvenuta con successo, ti abbiamo inviato un email di conferma')
      navigate('/')
    } else {
      notify('Errore: inserimento non riuscito')
    }
  }

  const saveName = (event) => {
    name = event.target.value
  }
  const saveSurname = (event) => {
    surname = event.target.value
  }

  const saveEmail = (event) => {
    email = event.target.value
  }

  return (
    <div className="background-container">
      <div style={{ height: '100%', width: '80%' }}>
        <br />
        <br />
        <table>
          <input
            className="custom-textbox"
            type="text"
            placeholder="Nome"
            onChange={saveName}
            style={{ marginLeft: '20%', width: '200px' }}
          />
          <input
            className="custom-textbox"
            type="text"
            placeholder="Cognome"
            onChange={saveSurname}
            style={{ marginLeft: '40%', width: '200px' }}
          />
          <input
            className="custom-textbox"
            type="text"
            placeholder="Email"
            onChange={saveEmail}
            style={{ marginLeft: '60%', width: '200px' }}
          />
        </table>
        <br />
        <br />
        <br />
        <br />
        <br />
        {objectList.length > 0 ? (
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilUser} />
                </CTableHeaderCell>
                <CTableHeaderCell>Nome</CTableHeaderCell>
                <CTableHeaderCell>Cognome</CTableHeaderCell>
                <CTableHeaderCell>Cimitero</CTableHeaderCell>
                <CTableHeaderCell>Segui gli aggiornamenti</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {objectList.map((item, index) => (
                <CTableRow key={index} style={{ backgroundColor: 'white' }}>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>
                    <div>{item.nome}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">{item.cognome}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">{item.cimitero}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">
                      <CButton color="success" variant="outline" onClick={() => followUser(item)}>
                        Segui
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <></>
        )}
        <ToastContainer />
      </div>
    </div>
  )
}

export default FollowTables
