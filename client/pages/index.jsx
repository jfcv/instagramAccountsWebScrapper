import Container from '../components/container'
import Accounts from '../components/accounts'
import AddAccount from '../components/addAccount'

import axios from 'axios'
const url = 'http://localhost:5000/accounts'

import {useState} from 'react'

const Index = (props) => {

    const [accounts, setAccounts] = useState({
        data: props.accounts,
        url: ''
    })

    return (
        <Container title={'Accounts'}>

            <h1 className="text-center">Instagram Accounts Currently Following</h1>

            <AddAccount accounts={accounts} setAccounts={setAccounts} />

            <Accounts accounts={accounts.data} />

        </Container>
    )
}

export async function getStaticProps(ctx) {
    try {
        const response = await axios.get(url);
        return {
            props: {
                accounts: response.data
            },
        }
    } catch (err) {
        console.error(err.message);
    }
}

export default Index

