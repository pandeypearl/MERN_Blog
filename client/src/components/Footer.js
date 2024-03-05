import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {  faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import EmailLink from './EmailLink';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <div className='footer-wrapper'>
            <hr />
            <div className='footer-container'>
                <div>
                    <Link to='/about'><FontAwesomeIcon icon={faUser} color='#9D68FF' /> About This Blog</Link>

                    <EmailLink 
                        emailAddress='blog@prettypandey.tech' 
                        subject='Blog Post: Title of Blog Post Here'
                        body='Please do not forget to reference the title of the blog post in the subject.'
                    />
                </div>

                <div>
                    <a href='https://www.prettypandey.tech' target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faAddressCard} color='#9D68FF' />Portfolio Website</a>
                    <a href='https://www.twitter.com/prettyppandey' target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faXTwitter} color='#9D68FF' />Follow Me On Twitter/X</a>
                </div>
            </div>
            <p className='site-date'><small>&copy; <span className='footer-logo'>PrettyTech</span> <span>{currentYear}</span></small></p>
        </div>
    );
}