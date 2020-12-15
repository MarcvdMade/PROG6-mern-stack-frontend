import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export class Footer extends React.Component {

    render() {

        return (
            <div className="Footer container-fluid no-gutters">
                <div className="footer-content">
                    <p>Made with <FontAwesomeIcon icon={faHeart} color="red" /> by Marc vd Made</p>
                    <div className="d-flex justify-content-center">
                    <a href="https://www.instagram.com/marcvdmade/?hl=nl" className="social-links instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="https://www.linkedin.com/in/marc-van-der-made-b15914193/" className="social-links"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>
            </div>
        )
    }
}