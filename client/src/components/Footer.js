import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {  faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const emailAddress = 'blog@prettypandey.tech';
    const subject = 'Blog Post: Title of Blog Post Here';
    const body = 'Please do not forget to reference the title of the blog post in the subject.'

    const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    return (
        <div className='footer-wrapper'>
            <div className='footer-container'>
                <div>
                    <Link to='/about'><FontAwesomeIcon icon={faUser} /> About This Blog</Link>
                    <a href={emailLink}><FontAwesomeIcon icon={faEnvelope} /> Get In Touch</a>
                </div>

                <div>
                    <a href='https://www.prettypandey.tech' target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faAddressCard} />Portfolio Website</a>
                    <a href='https://www.twitter.com/prettyppandey' target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faXTwitter} />Follow Me On Twitter/X</a>
                </div>
            </div>
            <p className='site-date'><small>&copy; <span className='footer-logo'>PrettyTech</span> <span>{currentYear}</span></small></p>
        </div>
    );
}