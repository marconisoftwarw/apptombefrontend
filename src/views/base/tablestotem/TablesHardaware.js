/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
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
import { getList as getListCimitero } from '../../../services/cimitero'
import hardware from '../../../assets/images/hardware.webp'

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
            <CTableHeaderCell className="text-center">Totem</CTableHeaderCell>
            <CTableHeaderCell className="text-center">IdUrna</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Id Cimitero</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Cimitero</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <img src={hardware} width={80} height={80} style={{ border: '1px solid' }} />
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.id}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.idCimitero}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.Nome}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CButton color="danger" variant="outline" onClick={() => deleteCimitero(item.id)}>
                  Elimina Totem
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default TablesTotemHardware
