import React, { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LocalizationContext.Provider value={{ t, changeLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocale = () => useContext(LocalizationContext);
