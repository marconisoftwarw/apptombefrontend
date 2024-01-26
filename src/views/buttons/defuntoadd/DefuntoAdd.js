import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react'
import Dropdown from 'react-bootstrap/Dropdown'
import { add } from '../../../services/defunto'
import 'react-toastify/dist/ReactToastify.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const DefuntoAdd = () => {
  const navigate = useNavigate()
  const { error } = useState(false)
  const [valueDate, setValue] = useState('')
  const [nome, setNome] = useState('')
  const [soprannome, setSoprannome] = useState('')
  const [sepoltura, setSepoltura] = useState('')
  const [dataNascita, setDataNascita] = useState('')
  const [idComune, setIdComune] = useState(0)
  const [cognome, setCognome] = useState('')
  const { state } = useLocation()
  const { list } = state

  const inserisci = async () => {
    try {
      await add(nome, cognome, idComune, valueDate, dataNascita, sepoltura, soprannome)
      navigate('/defunto')
    } catch (e) {
      //console.error('Errore ' + e)
    }
  }

  const setComune = (item) => {
    setIdComune(item.id)
  }

  const changeNome = (val) => {
    setNome(val.target.value)
  }
  const changeCognome = (val) => {
    setCognome(val.target.value)
  }
  const changesetSepoltura = (val) => {
    setSepoltura(val.target.value)
  }

  const changesetSoprannome = (val) => {
    setSoprannome(val.target.value)
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

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-6">
          <CCardHeader>
            {error === true ? (
              <p style={{ color: 'red' }}>Errore: compilati tutti i campi</p>
            ) : (
              <strong>Per inserire un nuovo defunto compila i campi qui sotto:</strong>
            )}
          </CCardHeader>
          <p></p>
          {getWidgeInput('Inserisci il nome del defunto', 'Nome', changeNome)}
          {getWidgeInput('Inserisci il cognome del defunto', 'Cognome', changeCognome)}
          {getWidgeInput('Inserisci il sopranome', 'Soprannome', changesetSoprannome)}
          {getWidgeInput('Inserisci il luogo di sepoltura', 'Sepoltura', changesetSepoltura)}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data Nascita defunto"
              value={dataNascita}
              onChange={(newValue) => {
                setDataNascita(newValue.toString())
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data morte defunto"
              value={valueDate}
              onChange={(newValue) => {
                setValue(newValue.toString())
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <p></p>
          {list != undefined ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Seleziona Comune
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {list.map((item, i) => (
                  <>
                    <Dropdown.Item key={Math.random() * i} onClick={() => setComune(item)}>
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

export default DefuntoAdd
