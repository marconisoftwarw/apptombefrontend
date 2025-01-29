import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cifIt } from '@coreui/icons'
import avatar1 from 'src/assets/images/totem.jpeg'
import { deleteTotem, getList, updateTotem } from '../../../services/totem'
import { url } from '../../../services/settings'

import urnaAvatar from 'src/assets/urna.png'
import avatarvisualizza from 'src/assets/visualizza.png'
import { getCimiteroNomeById } from '../../../services/cimitero'
import Dropdown from 'react-bootstrap/Dropdown'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import avatardelete from 'src/assets/delete.png'
import { getuserList } from '../../../services/user'

const TablesTotem = () => {
  const [users, setUserList] = useState([])
  const [usernames, setUsernames] = useState([])
  const [checkUrne, setCheckUrne] = useState(false)
  useEffect(() => {
    // Check if the user is an admin by reading from localStorage
    const userType = localStorage.getItem('type')
    if (userType === 'ADMIN1') {
      setCheckUrne(true)
    }

    async function fetchData() {
      let list = []
      const cimiteri = await getList()

      // Retrieve the user id from localStorage
      const idUser = await localStorage.getItem('idUser')

      for (const item of cimiteri) {
        const nomeCitta = await getCimiteroNomeById(item.idCimitero)
        item.citta = nomeCitta

        if (checkUrne == true) {
          if (item.idUtenteVisibile == idUser) {
            // Only push items where idUtenteVisibile matches the idUser from localStorage
            list.push({
              id: item.id,
              nome: item.nome,
              avatar: { src: avatar1, status: 'success' },
              provincia: item.regione,
              cap: item.cap,
              user: { name: nomeCitta || 'Città non disponibile' },
              country: { name: 'ITA', flag: cifIt },
              idCimitero: item.idCimitero,
              activity: item.comune,
              istemplatevalid: item.istemplatevalid,
              idUtenteVisibile: item.idUtenteVisibile,
            })
          }
        } else {
          list.push({
            id: item.id,
            nome: item.nome,
            avatar: { src: avatar1, status: 'success' },
            provincia: item.regione,
            cap: item.cap,
            user: { name: nomeCitta || 'Città non disponibile' },
            country: { name: 'ITA', flag: cifIt },
            idCimitero: item.idCimitero,
            activity: item.comune,
            istemplatevalid: item.istemplatevalid,
            idUtenteVisibile: item.idUtenteVisibile,
          })
        }
      }
      setUserList(list)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchUsers() {
      const userList = await getuserList()
      setUsernames(userList)
    }
    fetchUsers()
  }, [])

  const deleteTotemUI = async (item) => {
    await deleteTotem(item.id)
    setUserList(users.filter((user) => user.id !== item.id))
  }

  const handleUserSelection = async (idTotem, idUtente) => {
    const success = await updateTotem(idTotem, idUtente)
  }

  const showHtml = (id, idCimitero) => {
    window.open(`${url}/cimitero${idCimitero}/${id}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell
            className="text-center"
            style={{ backgroundColor: 'rgb(176, 219, 240)' }}
          ></CTableHeaderCell>
          <CTableHeaderCell
            className="text-center"
            style={{ backgroundColor: 'rgb(176, 219, 240)' }}
          >
            Id Urna
          </CTableHeaderCell>
          <CTableHeaderCell
            className="text-center"
            style={{ backgroundColor: 'rgb(176, 219, 240)' }}
          >
            Nome Urna
          </CTableHeaderCell>
          <CTableHeaderCell
            className="text-center"
            style={{ backgroundColor: 'rgb(176, 219, 240)' }}
          >
            Nome Cimitero
          </CTableHeaderCell>
          <CTableHeaderCell
            className="text-center"
            style={{ backgroundColor: 'rgb(176, 219, 240)' }}
          >
            IdCimitero
          </CTableHeaderCell>
          <CTableHeaderCell
            className="text-center"
            style={{ backgroundColor: 'rgb(176, 219, 240)' }}
          >
            Elimina Urna
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {users.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell className="text-center">
              <img
                src={urnaAvatar}
                width={50}
                height={50}
                style={{ backgroundColor: 'white', borderRadius: '5px' }}
              />
            </CTableDataCell>
            <CTableDataCell className="text-center">{item.id}</CTableDataCell>
            <CTableDataCell className="text-center">{item.nome}</CTableDataCell>
            <CTableDataCell className="text-center">{item.user.name}</CTableDataCell>
            <CTableDataCell className="text-center">{item.idCimitero}</CTableDataCell>
            <CTableDataCell className="text-center">
              <img src={avatardelete} width={40} onClick={() => deleteTotemUI(item)} />
            </CTableDataCell>
            {item.istemplatevalid && (
              <>
                <CTableDataCell className="text-center">
                  <img
                    src={avatarvisualizza}
                    width={140}
                    onClick={() => showHtml(item.id, item.idCimitero)}
                  />
                </CTableDataCell>
                <Dropdown>
                  <Dropdown.Toggle variant="light">
                    <CIcon icon={cilPeople} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {usernames.map((user, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={() => handleUserSelection(item.id, user.id)}
                      >
                        {user.username}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default TablesTotem
