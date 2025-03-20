import React from 'react'
import { usePreferencesStore } from '../../store/preferencesStorePouchDB'
//import { usePreferencesStore } from '../../store/preferencesStore';
import { useAuthStore } from '../../store/authStore';

const GlobalSetup = () => {
    const { theme, fontSize, contrast, reducedMotion, getUserPreferences, } = usePreferencesStore();
    const { user, isAuthorized } = useAuthStore();
    const setTheme = (theme) => {
        console.log('setTheme', theme);
        const root = window.document.documentElement;
    
        // Remove old theme classes
        root.classList.remove('light', 'dark');
        
        // Add new theme class
        root.classList.add(theme);
        //document.documentElement.style.setProperty('--theme', theme);
    }
    const setFontSize = (fontSize) => {
        console.log("setFontSize", fontSize);
        document.documentElement.style.fontSize = `${fontSize}%`;
        //document.documentElement.style.setProperty('--fontSize', fontSize);
    }
    const setContrast = (contrast) => {
        console.log("setContrast", contrast);
        document.documentElement.style.setProperty('--contrast', contrast);
    }
    const setReducedMotion = (reducedMotion) => {
        console.log("setReducedMotion", reducedMotion);
        document.documentElement.style.setProperty('--reducedMotion', reducedMotion);
    }
    React.useEffect(() => {
        console.log(user);
        if (!user && !isAuthorized) return;
        getUserPreferences(user.name);
    }, []);
    React.useEffect(() => {
        if (!user && !isAuthorized) return;
        setTheme(theme);
    }, [theme]);
    React.useEffect(() => {
        if (!user && !isAuthorized) return;
        setFontSize(fontSize);
    }, [fontSize]);
    React.useEffect(() => {
        if (!user && !isAuthorized) return;
        setContrast(contrast);
    }, [contrast]);
    React.useEffect(() => {
        if (!user && !isAuthorized) return;
      setReducedMotion(reducedMotion);
    }, [reducedMotion]);
    

  return (
    <></>
  )
}

export default GlobalSetup