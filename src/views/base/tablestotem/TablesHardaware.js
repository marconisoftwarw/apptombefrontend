/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { deleteCimitero, getList } from '../../../services/hardwaretotem'
import { getList as getListCimitero, getCimiteroNomeById } from '../../../services/cimitero'
import avatardelete from 'src/assets/delete.png'
import avatarstampa from 'src/assets/totem.png'
const TablesTotemHardware = () => {
  const navigate = useNavigate()
  const [users, setUserList] = useState([])
  const [cimiteri, setCimiteriList] = useState([])
  useEffect(() => {
    var list = []
    var listCimiteri = []
    async function fetchData() {
      var totem = await getList()
      var cimiteri = await getListCimitero()
      totem.map(async (item) =>
        list.push({
          id: item.id,
          idCimitero: item.idCimitero,
          Nome: item.Nome,
          citta: item.citta,
        }),
      )
      cimiteri.map(async (item) =>
        listCimiteri.push({
          id: item.id,
          idCimitero: item.idCimitero,
          citta: item.citta,
        }),
      )
      setCimiteriList(cimiteri)
      setUserList(list)
    }
    fetchData()
  }, [])

  const createTotem = () => {
    navigate('/base/tables/totem/hardware/add', { state: { list: cimiteri } })
  }

  return (
    <>
      <p></p>
      <CButton onClick={() => createTotem()}>Nuovo Totem</CButton>
      <p></p>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              Totem
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              IdUrna
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              Città
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              Id Cimitero
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              Cimitero
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <img src={avatarstampa} width={50} height={50} />
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.id}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.citta}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.idCimitero}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.Nome}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <img src={avatardelete} width={50} onClick={() => deleteCimitero(item)} />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default TablesTotemHardware
