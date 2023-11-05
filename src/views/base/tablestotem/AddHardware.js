import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CInputGroup,
  CFormInput,
  CButton,
} from '@coreui/react'
import Dropdown from 'react-bootstrap/Dropdown'
import 'react-toastify/dist/ReactToastify.css'
import { addtotem } from '../../../services/hardwaretotem'

const AddHardware = () => {
  const navigate = useNavigate()
  const { error } = useState(false)
  const [idCimitero, setIdCimitero] = useState(0)
  const { state } = useLocation()
  const { list } = state

  const inserisci = async () => {
    try {
      await addtotem(idCimitero)
      navigate('/base/tables/totem/hardware')
    } catch (e) {
      console.log('Errore ' + e)
    }
  }

  const setCimitero = (item) => {
    setIdCimitero(item.id)
  }

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-6">
          <CCardHeader>
            {error === true ? (
              <p style={{ color: 'red' }}>Errore: compilati tutti i campi</p>
            ) : (
              <strong>Per inserire un nuovo totem, seleziona in cimitero dal dropdown: </strong>
            )}
          </CCardHeader>
          <p></p>
          {list != undefined ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Seleziona Comune
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {list.map((item, i) => (
                  <>
                    <Dropdown.Item key={Math.random() * i} onClick={() => setCimitero(item)}>
                      {item.citta}
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

export default AddHardware
