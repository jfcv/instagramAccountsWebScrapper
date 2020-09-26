import Container from '../components/container'
import Accounts from '../components/accounts'

import axios from 'axios'
const url = 'http://localhost:5000/accounts'

const Index = ({accounts}) => {

    return (
        <Container title={'Accounts'}>

            <h1>Instagram Accounts Currently Following</h1>

            <Accounts accounts={accounts} />

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
        console.error(err);
    }
}

export default Index

