import Head from 'next/head'
import Navigation from './navigation'
import Footer from './footer'

const Container = (props) => {
    return (
        <div>

            <Head>
                <title>{props.title}</title>
            </Head>
            
            <Navigation />

            <div>
                {props.children}
            </div>

            <Footer />

        </div>
    )
}

export default Container