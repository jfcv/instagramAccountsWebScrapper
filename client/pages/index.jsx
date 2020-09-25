import Container from '../components/container'
import axios from 'axios'
import Accounts from '../components/accounts'

const Index = (props) => {
    
    return (
        <Container title={'Accounts'}>

            <h1>Instagram Accounts Currently Following</h1>

            <Accounts accounts={props.accounts} />

        </Container>
    )
}

const url = 'http://localhost:5000/accounts'

Index.getInitialProps = async (ctx) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        return {accounts: data}
    } catch (err) {
        console.error(err);
    }    
}

export default Index

