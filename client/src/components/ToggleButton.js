import { useState } from "react";

export default function ToggleButton() {
    const [isLightMode, setIsLightMode] = useState(true);

    const handleToggle = () => {
        setIsLightMode(prevMode => !prevMode);
    };

    return (
        <div className='toggle-wrapper'>
            <label className='toggle-btn'>
                <input type='checkbox' checked={isLightMode} onChange={handleToggle} />
                <span className='toggle-btn-label'>
                    <span className='toggle-btn-handle'></span>
                </span>
            </label>
        </div>
    );
}