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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addcimitero } from '../../../services/cimitero'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import jsonfile from '../../../assets/city.json'

var objectList = jsonfile
const Cimitero = () => {
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [cityList, setCityList] = useState([])

  const navigate = useNavigate()
  const { error } = useState(false)
  const notify = (message) => toast(message)
  let nome = ''

  const inserisci = async () => {
    try {
      await addcimitero(nome, country, city, region)
      navigate('/lista/cimiteri')
    } catch (err) {
      notify('Errore')
    }
  }

  const changetext = (val) => {
    nome = val.target.value
  }

  const getWidgeInput = (placeholder, autoComplete, onChangeFunction) => {
    return (
      <CInputGroup className="mb-3">
        <CFormInput
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChangeFunction}
        />
      </CInputGroup>
    )
  }

  useEffect(() => {
    if (region.length > 0) {
      let index = [
        'Basilicata',
        'Calabria',
        'Campania',
        'Emilia-Romagna',
        'Friuli-Venezia Giulia',
        'Lazio',
        'Liguria',
        'Lombardia',
        'Marche',
        'Molise',
        'Piemonte',
        'Puglia',
        'Sardegna',
        'Sicilia',
        'Toscana',
        'Trentino-Alto Adige',
        'Umbria',
        "Valle d'Aosta",
        'Veneto',
      ].indexOf(region)
      if (index !== -1) {
        setCityList(objectList[index]['provinces'])
      }
    }
  }, [region])

  return (
    <CRow className="justify-content-center">
      <CCol xs={6}>
        <CCard
          className="mb-6"
          style={{ backgroundColor: 'transparent', border: 'none', paddingTop: '30px' }}
        >
          <CCardHeader
            className="text-center"
            style={{ backgroundColor: 'transparent', border: 'none', paddingTop: '30px' }}
          >
            {error === true ? (
              <p style={{ color: 'red' }}>Errore: compilati tutti i campi</p>
            ) : (
              <strong>Per inserire un nuovo cimitero compila i campi qui sotto:</strong>
            )}
          </CCardHeader>
          <div className="text-center">
            {getWidgeInput('Associa un nome al nuovo cimitero', 'nome', changetext)}
            <div>
              <label>
                <b>Seleziona nazione</b>
              </label>
              <CountryDropdown
                value={country}
                onChange={(val) => setCountry(val)}
                priorityOptions={['IT']}
                style={{ width: '100%', height: '30%' }}
              />
              <label>
                <b>Regione</b>
              </label>
              <RegionDropdown
                country={country}
                value={region}
                onChange={(val) => setRegion(val)}
                style={{ width: '100%', height: '30%' }}
              />
              {region.length > 0 && (
                <>
                  <label>
                    <b>Citta</b>
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={cityList}
                    sx={{ width: '100%', height: '30%' }}
                    renderInput={(params) => <TextField {...params} label="Citta" />}
                    onChange={(val) => setCity(val.target.outerText)}
                  />
                </>
              )}
            </div>
          </div>
          <CCardBody className="text-center">
            <CButton
              color={'success'}
              onClick={() => inserisci()}
              style={{ backgroundColor: 'white', color: 'lightblue', border: '2px solid white' }}
            >
              Inserisci
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Cimitero
