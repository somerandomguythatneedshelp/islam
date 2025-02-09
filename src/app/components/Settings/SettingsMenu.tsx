// src/app/components/Settings/SettingsMenu.tsx
'use client';

import { useState, useEffect } from 'react';

interface SettingsMenuProps {
    onLanguageChange: (languageId: number) => void;
}

const SettingsMenu = ({ onLanguageChange }: SettingsMenuProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState<number>(131); // Default to English

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const languageId = parseInt(event.target.value, 10);
        setSelectedLanguage(languageId);
        onLanguageChange(languageId);
    };

    return (
        <div className="settings-menu">
            <label htmlFor="language-select">Select Language:</label>
            <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value={131}>English</option>
                <option value={234}>اردو</option>
                <option value={122}>हिन्दी</option>
                <option value={210}>Türkçe</option>
            </select>
        </div>
    );
};

export default SettingsMenu;