import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {  faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className='footer-wrapper'>
            <div className='footer-container'>
                <div>
                    <a href='About'><FontAwesomeIcon icon={faUser} /> About This Blog</a>
                    <a href='About'><FontAwesomeIcon icon={faEnvelope} /> Get In Touch</a>
                </div>

                <div>
                    <a href=''><FontAwesomeIcon icon={faAddressCard} />Portfolio Website</a>
                    <a href=''><FontAwesomeIcon icon={faXTwitter} />Follow Me On Twitter/X</a>
                </div>
            </div>
            <p className='site-date'><small>&copy; <span className='footer-logo'>PrettyTech</span> <span>{currentYear}</span></small></p>
        </div>
    );
}