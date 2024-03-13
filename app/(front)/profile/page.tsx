import { Metadata } from 'next'
import Form from './Form'
import Form2 from './Form2'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function Profile() {
  return <Form />
}
