import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CButton,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cifIt, cilPeople } from '@coreui/icons'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import { getuserList, changeStateUser, deleteUser, aggiornatipologia } from '../../services/user'
import Dropdown from 'react-bootstrap/Dropdown'
import 'react-toastify/dist/ReactToastify.css'
/* eslint-disable react/prop-types */
function DropdownCustomUser(props) {
  const userSelect = async (value) => {
    await aggiornatipologia(props.id, value)
    window.location.reload(false)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Tipologia
      </Dropdown.Toggle>
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
            color: 'success',
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
    } else {
      console.log('Errore eliminazione utente')
    }
  }

  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Utente</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Nazione</CTableHeaderCell>
            <CTableHeaderCell>Utilizzo Medio</CTableHeaderCell>
            <CTableHeaderCell>Data Registrazione</CTableHeaderCell>
            <CTableHeaderCell>Abilitia/Disabilita</CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell>Modifica Tipologia</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.user.name}</div>
                <div className="small text-medium-emphasis">
                  <span>{item.user.new ? 'New' : 'Tipologia:'}</span> {item.type} | Email:{' '}
                  {item.user.registered}
                </div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
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
                <div className="small text-medium-emphasis">Last login</div>
                <strong>{item.activity}</strong>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CButton color="primary" onClick={() => updateStateUser(item)} active>
                  Enable/Disable
                </CButton>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CButton color="danger" onClick={() => deleteUserTable(item)} active>
                  Delete
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <DropdownCustomUser id={item.id} />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Dashboard
