import React from 'react'
import { UserTable } from './users-table'
import { getUsers } from '../_api/fetch'

export default async function Users() {

      const Users = await getUsers()

  return (
    <>
        <UserTable data={Users} />
    </>
  )

}

