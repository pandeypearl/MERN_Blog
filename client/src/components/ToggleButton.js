import { useLightDarkMode } from "../utils/LightDarkModeContext";

export default function ToggleButton() {
    const { isLightMode, toggleMode } = useLightDarkMode();

    const handleToggle = () => {
        toggleMode(); // Call the toggle function to update the mode state
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