import { useLightDarkMode } from "../utils/LightDarkModeContext";

export default function ToggleButton() {
    const { isLightMode, toggleMode } = useLightDarkMode();

    return (
        <div className='toggle-wrapper'>
            <label className='toggle-btn'>
                <input type='checkbox' checked={isLightMode} onChange={toggleMode} />
                <span className='toggle-btn-label'>
                    <span className='toggle-btn-handle'></span>
                </span>
            </label>
        </div>
    );
}