import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
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
import immg1 from '../../../assets/layout/01.png'
import immg2 from '../../../assets/layout/07.png'
import FileBase64 from 'react-file-base64'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { generateTemplate } from '../../../services/template'
import Dropdown from 'react-bootstrap/Dropdown'
import './AddSpazio.css'

function DropdownSample(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Seleziona Template
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => props.setValue(1)}>TEMPLATE 1 </Dropdown.Item>
        <Dropdown.Item onClick={() => props.setValue(2)}>TEMPLATE 2</Dropdown.Item>
        {/*  <Dropdown.Item onClick={() => props.setValue(3)}>TEMPLATE 3</Dropdown.Item>*/}
      </Dropdown.Menu>
    </Dropdown>
  )
}

DropdownSample.propTypes = {
  setValue: PropTypes.func.isRequired,
}

const AddSpazio = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [valueTemplate, setValueTemplate] = useState(1)
  const [immagineSelect, SetImmagine] = useState(1)
  let image, image2, image3
  const notify = (message) => toast(message)
  let nome = '',
    testo = ''

  useEffect(() => {
    async function fetchData() {
      nome = await localStorage.getItem('NomeDefuntoLoad')
    }
    fetchData()
  }, [])

  const inserisci = async () => {
    const idDefunto = await localStorage.getItem('idDefunto')
    const idCimitero = await localStorage.getItem('idCimitero')
    const idTotem = await localStorage.getItem('idTotem')

    console.log(
      idTotem + ' ' + idCimitero + ' ' + idDefunto + ' nome: ' + nome + ' testo: ' + testo,
    )
    if (nome !== '') {
      await generateTemplate(
        nome,
        nome,
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
    nome = val.target.value
  }

  const loadImage = (val, number) => {
    if (number === 1) {
      image = val[0].base64
    } else if (number === 2) {
      image2 = val[0].base64
    } else {
      image3 = val[0].base64
    }
    SetImmagine(number)
  }

  const getWidgeInput = (placeholder, autoComplete, onChangeFunction, value) => {
    return (
      <div style={{ width: '350px', marginLeft: '50px' }}>
        {' '}
        <CInputGroup className="mb-3">
          <CFormInput
            defaultValue={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChangeFunction}
          />
        </CInputGroup>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '30px', marginLeft: '10%' }}>
      <CRow>
        <CCol xs={12}>
          <CCard className="custom-card mb-6">
            {' '}
            <CCardHeader>
              {error ? (
                <p style={{ color: 'red' }}>Errore: compilati tutti i campi</p>
              ) : (
                <strong>Per inserire un nuovo layout compila i campi qui sotto:</strong>
              )}
            </CCardHeader>
            <p></p>
            <p></p>
            <div style={{ marginLeft: '50px' }}>
              <DropdownSample setValue={setValueTemplate} />
            </div>
            <div style={{ marginLeft: '50px', marginTop: '20px' }}>
              {valueTemplate === 1 ? <img src={immg1} width={300} /> : ''}
              {valueTemplate === 2 ? <img src={immg2} width={300} /> : ''}
            </div>
            <p></p>
            {getWidgeInput('Testo', 'Testo', changetesto)}
            {getWidgeInput('Messaggio', 'messaggio', changetesto)}
            <div style={{ marginLeft: '50px' }}>
              <FileBase64 multiple={true} onDone={(base64) => loadImage(base64, 1)} />
            </div>
            {/*strong>Immagine 2: </strong>
          <FileBase64 multiple={true} onDone={(base64) => loadImage(base64, 2)} />
          <strong>Immagine 3: </strong>
          <FileBase64 multiple={true} onDone={(base64) => loadImage(base64, 3)} />*/}
            <CCardBody>
              <CButton color={'success'} onClick={inserisci} style={{ marginLeft: '35px' }}>
                Genera layout
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default AddSpazio
