import React from 'react'
import { ChartsTable } from './charts-table'
import { getUsersCharts } from '../_api/fetch'

export default async function Charts() {

      const Charts = await getUsersCharts()

  return (
    <>
        <ChartsTable data={Charts} />
    </>
  )

}

