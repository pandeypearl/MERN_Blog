import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';

export default function PostFooter() {
    return (
        <div className='post-footer'>
            <p>If you've found any of my posts helpful and would like to show your appreciation, consider keeping me energized:
            </p>
            <a href='https://www.buymeacoffee.com/prettypandey' target='_blank' rel="noopener noreferrer"> 
            <FontAwesomeIcon icon={faMugSaucer} />
            buy me a coffee </a>
        </div>
    )
}