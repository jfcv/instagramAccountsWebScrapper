
const Footer = () => {
    return(
        <footer className="text-center p-2" style={footerStyle}>
            &copy; Snappr | Copyright 2020
        </footer>
    )
}

export default Footer

const footerStyle = {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    borderTop: '2px dotted',
}