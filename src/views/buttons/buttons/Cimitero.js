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
  useEffect(() => {
    if (region.length > 0) {
      var index = 0
      if (region == 'Basilicata') {
        index = 1
      } else if (region == 'Calabria') {
        index = 2
      } else if (region == 'Campania') {
        index = 3
      } else if (region == 'Emilia-Romagna') {
        index = 4
      } else if (region == 'Friuli-Venezia Giulia') {
        index = 5
      } else if (region == 'Lazio') {
        index = 6
      } else if (region == 'Liguria') {
        index = 7
      } else if (region == 'Lombardia') {
        index = 8
      } else if (region == 'Marche') {
        index = 9
      } else if (region == 'Molise') {
        index = 10
      } else if (region == 'Piemonte') {
        index = 11
      } else if (region == 'Puglia') {
        index = 12
      } else if (region == 'Sardegna') {
        index = 13
      } else if (region == 'Sicilia') {
        index = 14
      } else if (region == 'Toscana') {
        index = 15
      } else if (region == 'Trentino-Alto Adige') {
        index = 16
      } else if (region == 'Umbria') {
        index = 17
      } else if (region == "Valle d'Aosta") {
        index = 18
      } else if (region == 'Veneto') {
        index = 19
      }
      setCityList(objectList[index]['provinces'])
    }
  })
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-6">
          <CCardHeader>
            {error === true ? (
              <p style={{ color: 'red' }}>Errore: compilati tutti i campi</p>
            ) : (
              <strong>Per inserire un nuovo cimitero compila i campi qui sotto:</strong>
            )}
          </CCardHeader>
          <p></p>
          {getWidgeInput('Associa un nome al nuovo cimitero', 'nome', changetext)}
          <div>
            <b>Nazione</b>
            <CountryDropdown
              value={country}
              onChange={(val) => setCountry(val)}
              priorityOptions={['IT']}
              style={{ width: '100%', height: '30%' }}
            />
            <b>Regione</b>
            <RegionDropdown
              country={country}
              value={region}
              onChange={(val) => setRegion(val)}
              style={{ width: '100%', height: '30%' }}
            />

            {region.length > 0 ? (
              <>
                <b>Citta</b>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cityList}
                  sx={{ width: '100%', height: '30%' }}
                  renderInput={(params) => <TextField {...params} label="Citta" />}
                  onChange={(val) => setCity(val.target.outerText)}
                />
              </>
            ) : (
              <></>
            )}
          </div>
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

export default Cimitero
