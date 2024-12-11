import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput, // Import for form input
  CFormSelect, // Import for select dropdown
  CFormCheck, // Import for checkbox (enable)
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cifIt, cilPeople } from '@coreui/icons'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import {
  aggiornatipologia,
  changeStateUser,
  deleteUser,
  getuserList,
  createUser,
} from '../../services/user'
import Dropdown from 'react-bootstrap/Dropdown'
import 'react-toastify/dist/ReactToastify.css'
import logo from './../../assets/usericon.png'
import deletelogo from './../../assets/delete.png'
import enablelogo from './../../assets/enable.png'

/* eslint-disable react/prop-types */

function DropdownCustomUser(props) {
  const userSelect = async (value) => {
    await aggiornatipologia(props.id, value)
    window.location.reload(false)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle>Tipologia</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => userSelect('ADMIN', props.id)}>Admin</Dropdown.Item>
        <Dropdown.Item onClick={() => userSelect('ADMIN1')}>Admin User</Dropdown.Item>
        <Dropdown.Item onClick={() => userSelect('UTENTE')}>Utente</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const Dashboard = () => {
  const [users, setUserList] = useState([])
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    enable: true,
    type: 'UTENTE',
  })

  useEffect(() => {
    var userObjectList = []
    async function fetchData() {
      var utenti = await getuserList()
      utenti.map((user) =>
        userObjectList.push({
          id: user.id,
          enable: user.enable,
          avatar: { src: avatar1, status: 'success' },
          type: user.type,
          user: {
            name: user.name + ' ' + user.surname,
            new: false,
            registered: user.email,
          },
          country: { name: 'ITA', flag: cifIt },
          usage: {
            value: 42,
            period: '',
            color: 'warning',
          },
          activity: user.dataregistrazione,
        }),
      )
      setUserList(userObjectList)
    }
    fetchData()
  }, [])

  const updateStateUser = async (user) => {
    await changeStateUser(user.id, user.enable)
  }

  const deleteUserTable = async (user) => {
    if ((await deleteUser(user.id)) == true) {
      window.location.reload(false)
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  // Handle the "Enable" checkbox toggle
  const handleEnableChange = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      enable: e.target.checked,
    }))
  }

  // Function to handle adding a new user
  const handleAddUser = async () => {
    try {
      const response = await createUser(newUser)
      if (response.success) {
        window.location.reload(false)
      } else {
        alert("Errore nella creazione dell'utente")
      }
    } catch (error) {
      console.error("Errore nell'aggiunta dell'utente:", error)
      alert("Errore nell'aggiunta dell'utente")
    }
  }

  return (
    <>
      {/* Users Table */}
      <CTable
        align="middle"
        className="mb-0 border"
        hover
        responsive
        style={{ backgroundColor: 'rgb(176, 219, 240)' }}
      >
        <CTableHead color="light" style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
          <CTableRow style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Ruolo
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Utente
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Utilizzo
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Registrazione
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Azioni
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar src={logo} size="md" />
              </CTableDataCell>
              <CTableDataCell>
                <DropdownCustomUser id={item.id} />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.user.name}</div>
                <div className="small text-medium-emphasis">
                  <span>{item.user.new ? 'New' : 'Tipologia:'}</span> {item.type} | Email:{' '}
                  {item.user.registered}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="clearfix">
                  <div className="float-start">
                    <strong>{item.usage.value}%</strong>
                  </div>
                  <div className="float-end">
                    <small className="text-medium-emphasis">{item.usage.period}</small>
                  </div>
                </div>
                <CProgress thin color={item.usage.color} value={item.usage.value} />
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.activity}</strong>
              </CTableDataCell>

              <CTableDataCell className="text-left">
                <CAvatar src={enablelogo} size="md" onClick={() => updateStateUser(item)} />
                <CAvatar src={deletelogo} size="md" onClick={() => deleteUserTable(item)} />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <br></br>
      <br></br>
      <b>Creazione Utente</b>
      <div style={{ width: '200px' }}>
        <div className="mb-2">
          <CFormInput
            type="text"
            placeholder="Nome"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            className="mb-2"
          />
          <CFormInput
            type="text"
            placeholder="Cognome"
            name="surname"
            value={newUser.surname}
            onChange={handleInputChange}
            className="mb-2"
          />
          <CFormInput
            type="text"
            placeholder="Username"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            className="mb-2"
          />
          <CFormInput
            type="password"
            placeholder="Password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            className="mb-2"
          />
          <CFormInput
            type="email"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="mb-2"
          />
          <CFormCheck
            type="checkbox"
            label="Enable"
            name="enable"
            checked={newUser.enable}
            onChange={handleEnableChange}
            className="mb-2"
          />
          <CFormSelect
            name="type"
            value={newUser.type}
            onChange={handleInputChange}
            className="mb-2"
          >
            <option value="ADMIN">Admin</option>
            <option value="ADMIN1">Admin User</option>
            <option value="UTENTE">Utente</option>
          </CFormSelect>
          <CButton color="primary" onClick={handleAddUser}>
            Aggiungi Utente
          </CButton>
        </div>
      </div>
    </>
  )
}

export default Dashboard
