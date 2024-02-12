/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import FileBase64 from 'react-file-base64'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { generateTemplate } from '../../../services/template'
import Dropdown from 'react-bootstrap/Dropdown'

function DropdownSample(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Seleziona Template
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => props.setValue(1)}>TEMPLATE 1 </Dropdown.Item>
        <Dropdown.Item onClick={() => props.setValue(2)}>TEMPLATE 2</Dropdown.Item>
        <Dropdown.Item onClick={() => props.setValue(3)}>TEMPLATE 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const AddSpazio = () => {
  const navigate = useNavigate()
  const { error, setError } = useState(false)
  let image, image2, image3
  const notify = (message) => toast(message)
  let valueTemplate = 1
  let nome = '',
    testo = ''

  useEffect(async () => {
    async function fetchData() {
      nome = await localStorage.getItem('NomeDefuntoLoad')
    }
    fetchData()
  })

  const inserisci = async () => {
    var idDefunto = await localStorage.getItem('idDefunto')
    var idCimitero = await localStorage.getItem('idCimitero')
    var idTotem = await localStorage.getItem('idTotem')
    if (nome != '' && testo != '') {
      await generateTemplate(
        nome,
        testo,
        'TEMPLATE' + valueTemplate,
        image,
        image2,
        image3,
        idDefunto,
        idCimitero,
        'TEMPLATE' + valueTemplate,
        idTotem,
      )

      navigate('/base/tables/totem')
      window.location.reload()
    } else {
      notify('Errore')
      setError(true)
    }
  }
  const changetesto = (val) => {
    testo = val.target.value
  }

  const loadImage = (val, number) => {
    if (number == 1) {
      image = val[0].base64
    } else if (number == 2) {
      image2 = val[0].base64
    } else {
      image3 = val[0].base64
    }
  }

  const getWidgeInput = (placeholder, autoComplete, onChangeFunction, value) => {
    return (
      <p width={100}>
        <CInputGroup className="mb-3">
          <CFormInput
            defaultValue={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChangeFunction}
          />
        </CInputGroup>
      </p>
    )
  }

  const setValue = (value) => {
    valueTemplate = value
  }
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-6">
          <CCardHeader>
            {error === true ? (
              <p style={{ color: 'red' }}>Errore: compilati tutti i campi</p>
            ) : (
              <strong>Per inserire un nuovo layout compila i campi qui sotto:</strong>
            )}
          </CCardHeader>
          <p></p>
          <DropdownSample setValue={setValue} />
          <p></p>
          {getWidgeInput('Messaggio', 'messaggio', changetesto)}
          <strong>Immagine 1: </strong>
          <FileBase64 multiple={true} onDone={(base64) => loadImage(base64, 1)} />
          <strong>Immagine 2: </strong>
          <FileBase64 multiple={true} onDone={(base64) => loadImage(base64, 2)} />
          <strong>Immagine 3: </strong>
          <FileBase64 multiple={true} onDone={(base64) => loadImage(base64, 3)} />
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

export default AddSpazio
