import React from 'react';

const Footer = () => {
    return (
        <footer style={style} className='footer'>
            Copyright &copy;
        </footer>
    );
}

const style = {
    color: "var(--white-color)",
    fontSize: "21px",
    backgroundColor: "var(--blue-color)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px"
}

export default Footer;
