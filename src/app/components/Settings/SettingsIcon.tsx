// src/app/components/Settings/SettingsIcon.tsx
'use client';

import { useState } from 'react';
import SettingsMenu from './SettingsMenu';

const SettingsIcon = ({ onLanguageChange }: { onLanguageChange: (languageId: number) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="settings-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 4c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 4c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 4c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 4c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 4c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"/>
                </svg>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <SettingsMenu onLanguageChange={onLanguageChange} />
                </div>
            )}
        </div>
    );
};

export default SettingsIcon;