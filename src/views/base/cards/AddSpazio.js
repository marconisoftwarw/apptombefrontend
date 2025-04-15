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
import immg8 from '../../../assets/layout/08.png'
import immg9 from '../../../assets/layout/09.png'
import immg10 from '../../../assets/layout/10.png'
import uploadimg from '../../../assets/upload.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { generateTemplate } from '../../../services/template'
import Dropdown from 'react-bootstrap/Dropdown'
import './AddSpazio.css'

function DropdownTemplateSelect({ setValue }) {
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
        {[...Array(10)].map((_, i) => (
          <Dropdown.Item key={i} onClick={() => setValue(i + 1)}>
            {
              [
                'Azzurro',
                'Botanico',
                'Bronzo',
                'Carta',
                'Cerchio',
                'Fregio',
                'Giallo',
                'Marmo',
                'Origami',
                'Rosa',
              ][i]
            }
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

DropdownTemplateSelect.propTypes = {
  setValue: PropTypes.func.isRequired,
}

const AddSpazio = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [valueTemplate, setValueTemplate] = useState(1)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [nome, setNome] = useState('')
  const [messaggio, setMessaggio] = useState('')
  const notify = (message) => toast(message)

  useEffect(() => {
    const nomeLocal = localStorage.getItem('NomeDefuntoLoad')
    if (nomeLocal) setNome(nomeLocal)
  }, [])

  const inserisci = async () => {
    const idDefunto = localStorage.getItem('idDefunto')
    const idCimitero = localStorage.getItem('idCimitero')
    const idTotem = localStorage.getItem('idTotem')

    if (nome) {
      await generateTemplate(
        nome,
        nome,
        'TEMPLATE' + valueTemplate,
        uploadedImage || '',
        '',
        '',
        idDefunto,
        idCimitero,
        'TEMPLATE' + valueTemplate,
        idTotem,
      )
      navigate('/base/tables/totem')
    } else {
      notify('Errore')
      setError(true)
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'image/png') {
      const reader = new FileReader()
      reader.onloadend = () => setUploadedImage(reader.result)
      reader.readAsDataURL(file)
    } else {
      notify('Puoi caricare solo file PNG.')
    }
  }

  const getWidgeInput = (placeholder, autoComplete, onChangeFunction, value) => (
    <div
      style={{
        width: '350px',
        height: '50px',
        background: '#FFFFFF',
        borderRadius: '25px',
        margin: '10px 0',
        opacity: '1',
      }}
    >
      <CInputGroup className="mb-3">
        <CFormInput
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChangeFunction}
          style={{ borderRadius: '25px', height: '100%' }}
        />
      </CInputGroup>
    </div>
  )

  const templateImages = [immg1, immg2, immg3, immg4, immg5, immg6, immg7, immg8, immg9, immg10]

  return (
    <div style={{ marginTop: '30px', marginLeft: '10%' }}>
      <CRow style={{ backgroundColor: 'white', padding: '20px' }}>
        <CCol xs={12} className="d-flex align-items-center">
          <CCard
            className="custom-card mb-6 flex-fill"
            style={{ backgroundColor: 'white', width: '100%' }}
          >
            <div style={{ marginLeft: '100px' }}>
              <DropdownTemplateSelect setValue={setValueTemplate} />
            </div>
            <br />
            <CRow
              className="g-0"
              style={{ width: '100%', justifyContent: 'space-between', marginTop: '20px' }}
            >
              <CCol xs={6} className="d-flex justify-content-center align-items-center">
                <div>
                  <img
                    src={templateImages[valueTemplate - 1]}
                    width={300}
                    alt={`Template ${valueTemplate}`}
                  />
                  <p>Nome: {nome}</p>
                </div>
              </CCol>
              <CCol xs={6} className="d-flex justify-content-center align-items-center">
                <label htmlFor="file-upload">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Caricata"
                      style={{
                        cursor: 'pointer',
                        maxWidth: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                      }}
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
            <div style={{ marginLeft: '50px', width: '400px' }}>
              {getWidgeInput('Nome', 'nome', (e) => setNome(e.target.value), nome)}
              {getWidgeInput(
                'Messaggio',
                'messaggio',
                (e) => setMessaggio(e.target.value),
                messaggio,
              )}
              <CCardBody>
                <CButton
                  color="success"
                  onClick={inserisci}
                  style={{
                    marginLeft: '800px',
                    backgroundColor: '#2B87BA',
                    color: 'white',
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
