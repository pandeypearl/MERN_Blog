import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function functionEmailLink({ emailAddress, subject, body }) {
    const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return(
        <a href={emailLink}><FontAwesomeIcon icon={faEnvelope} color='#9D68FF' />Get In Touch</a>
    );
}