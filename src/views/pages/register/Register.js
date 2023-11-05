import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { register } from '../../../services/user'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Define of user select
var userSelectValue = 'UTENTE'

const Register = () => {
  let user, password, email, name, surname
  const navigate = useNavigate()
  const notify = (message) => toast(message)
  const registerfunction = async () => {
    if (
      name != '' &&
      surname != '' &&
      user != '' &&
      password != '' > 0 &&
      email != '' > 0 &&
      userSelectValue != '' > 0
    ) {
      var islogin = await register(name, surname, user, password, email, userSelectValue)
      if (islogin == false) {
        notify('Errore: Attenzione verifica che i campi siano correttamente compilati')
      } else {
        notify('Registrazione avvenuta con successo, ti abbiamo inviato un email')

        setInterval(() => {
          navigate('/login')
        }, 2000)
      }
    } else {
      notify('Errore: alcuni campi non risultano compilati correttamente')
    }
  }

  const changeTextUsername = (val) => {
    user = val.target.value
  }

  const changeTextName = (val) => {
    name = val.target.value
  }

  const changeTextSurname = (val) => {
    surname = val.target.value
  }

  const changeTextEmail = (val) => {
    email = val.target.value
  }

  const changeTextPassword = (val) => {
    password = val.target.value
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registrati al portale</h1>
                  <p className="text-medium-emphasis">Crea il tuo account</p>
                  {/*<DropdownCustomUser />*/}
                  <p></p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={changeTextUsername}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Name" autoComplete="Name" onChange={changeTextName} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Surname"
                      autoComplete="Surname"
                      onChange={changeTextSurname}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={changeTextEmail}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={changeTextPassword}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={() => registerfunction()}>
                      Crea Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
              <ToastContainer />
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
