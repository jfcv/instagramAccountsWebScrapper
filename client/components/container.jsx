import Head from 'next/head'
import Navigation from './navigation'
import Footer from './footer'

const Container = (props) => {
    return (
        <div>

            <Head>
                <title>{props.title}</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/sketchy/bootstrap.min.css"/>
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