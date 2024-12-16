import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import immg1 from '../../../assets/layout/01.png'
import immg2 from '../../../assets/layout/02.png'
import immg3 from '../../../assets/layout/03.png'
import immg4 from '../../../assets/layout/04.png'
import immg5 from '../../../assets/layout/05.png'
import immg6 from '../../../assets/layout/06.png'
import immg7 from '../../../assets/layout/07.png'
import uploadimg from '../../../assets/upload.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { generateTemplate } from '../../../services/template'
import Dropdown from 'react-bootstrap/Dropdown'
import './AddSpazio.css'

function DropdownSample(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-basic"
        style={{
          background: 'white',
          color: '#73C2ED',
          border: '1px solid #4F4F4F',
          marginTop: '20px',
        }}
      >
        Seleziona Template
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => props.setValue(1)}>TEMPLATE 1</Dropdown.Item>
        <Dropdown.Item onClick={() => props.setValue(2)}>TEMPLATE 2</Dropdown.Item>
        <Dropdown.Item onClick={() => props.setValue(3)}>TEMPLATE 3</Dropdown.Item>
        <Dropdown.Item onClick={() => props.setValue(4)}>TEMPLATE 4</Dropdown.Item>
        <Dropdown.Item onClick={() => props.setValue(5)}>TEMPLATE 5</Dropdown.Item>
        <Dropdown.Item onClick={() => props.setValue(6)}>TEMPLATE 6</Dropdown.Item>
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
  const [uploadedImage, setUploadedImage] = useState(null)
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

    if (nome !== '') {
      await generateTemplate(
        nome,
        nome,
        'TEMPLATE' + valueTemplate,
        uploadedImage || '', // Usare l'immagine caricata in formato Base64
        '', // image2 placeholder
        '', // image3 placeholder
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Controlla che il file sia un PNG
      if (file.type !== 'image/png') {
        notify('Puoi caricare solo file PNG.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const getWidgeInput = (placeholder, autoComplete, onChangeFunction, value) => {
    return (
      <div
        style={{
          top: '662px',
          left: '200px',
          width: '350px',
          height: '50px',
          background: '#FFFFFF',
          borderRadius: '25px',
          marginLeft: '260%',
          opacity: '1',
        }}
      >
        <CInputGroup className="mb-3">
          <CFormInput
            defaultValue={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChangeFunction}
            style={{ borderRadius: '25px', height: '100%' }}
          />
        </CInputGroup>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '30px', marginLeft: '10%' }}>
      <CRow style={{ backgroundColor: 'white', padding: '20px' }}>
        <CCol xs={12} className="d-flex align-items-center">
          <CCard
            className="custom-card mb-6 flex-fill"
            style={{ backgroundColor: 'white', marginRight: '10px', height: '100%' }}
          >
            <div style={{ marginLeft: '50px', marginLeft: '100px' }}>
              <DropdownSample setValue={setValueTemplate} />
            </div>
            <CRow
              className="g-0"
              style={{
                width: '100%',
                justifyContent: 'space-between',
                marginTop: '20px',
                marginRight: '90px',
              }}
            >
              <CCol xs={6} className="d-flex justify-content-center align-items-center">
                <div>
                  {valueTemplate === 1 && <img src={immg1} width={300} alt="Template 1" />}
                  {valueTemplate === 2 && <img src={immg2} width={300} alt="Template 2" />}
                  {valueTemplate === 3 && <img src={immg3} width={300} alt="Template 3" />}
                  {valueTemplate === 4 && <img src={immg4} width={300} alt="Template 4" />}
                  {valueTemplate === 5 && <img src={immg5} width={300} alt="Template 5" />}
                  {valueTemplate === 6 && <img src={immg6} width={300} alt="Template 6" />}
                  <p>Nome: {localStorage.getItem('NomeDefuntoLoad')?.replace('<br></br>', '')}</p>
                </div>
              </CCol>

              <CCol xs={6} className="d-flex justify-content-center align-items-center">
                <label htmlFor="file-upload">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      width={370}
                      height={160}
                      alt="Caricata"
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <img
                      src={uploadimg}
                      width={370}
                      height={160}
                      alt="Upload"
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/png"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </CCol>
            </CRow>

            <div style={{ marginLeft: '50px', width: '200px' }}>
              {getWidgeInput('Testo', 'Testo', changetesto)}
              {getWidgeInput('Messaggio', 'messaggio', changetesto)}
              <CCardBody>
                <CButton
                  color={'success'}
                  onClick={() => inserisci()}
                  style={{
                    marginLeft: '35px',
                    backgroundColor: '#2B87BA',
                    color: 'white',
                    marginLeft: '800px',
                  }}
                >
                  Conferma
                </CButton>
              </CCardBody>
            </div>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default AddSpazio
