/* eslint-disable jsx-a11y/alt-text */
/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addtotem } from '../../../services/totem'
import ui from '../../../assets/images/totem.jpeg'
import 'react-toastify/dist/ReactToastify.css'
import Dropdown from 'react-bootstrap/Dropdown'

const Totem = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { list } = state
  const { error, setError } = useState(false)
  const notify = (message) => toast(message)
  let nome = ''
  let idTotem = 0

  const inserisci = async () => {
    try {
      var IdCimitero = localStorage.getItem('IdCimitero')
      await addtotem(nome, IdCimitero, idTotem)
      navigate('/lista/cimiteri')
    } catch (e) {
      notify('Errore')
    }
  }

  const getWidgeInput = (placeholder, autoComplete, onChangeFunction) => {
    return (
      <p width={100}>
        <CInputGroup className="mb-3">
          <CFormInput
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChangeFunction}
          />
        </CInputGroup>
      </p>
    )
  }

  const changeId = (id) => {
    idTotem = id
  }

  const changeNome = (event) => {
    nome = event.target.value
  }

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-1">
          <div style={{ alignContent: 'center', marginLeft: 50 }}>
            <img src={ui} width="250" height="200" />
          </div>
          <CCardHeader>
            {error === true ? (
              <p style={{ color: 'red' }}>Errore: compilati tutti i campi</p>
            ) : (
              <strong>Per inserire la nuova urna compila i campi qui sotto:</strong>
            )}
          </CCardHeader>
          <p style={{ marginLeft: 100 }}>
            Il nuovo elemento verrà inserita nel comune di: <b>{localStorage.getItem('Comune')}</b>
          </p>
          {getWidgeInput('Inserisci il nome', 'Nome', changeNome)}
          {list != undefined ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Seleziona Totem
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {list.map((item, i) => (
                  <>
                    <Dropdown.Item key={Math.random() * i} onClick={() => changeId(item.id)}>
                      {item.id}
                    </Dropdown.Item>
                  </>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>Nessun cimitero inserito</>
          )}
          <CCardBody>
            <CButton color={'success'} onClick={() => inserisci()}>
              Inserisci
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Totem
