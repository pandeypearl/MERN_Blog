export default function functionEmailLink({ emailAddress, subject, body, buttonText }) {
    const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return(
        <a href={emailLink} target="_blank" rel="noopener noreferrer">{buttonText}</a>
    );
}