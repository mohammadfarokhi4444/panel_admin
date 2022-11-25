import { useState, createContext, useContext } from "react";
import { useTranslation } from "react-i18next";


const LayoutStateContext = createContext();

function LayoutProvider({ children }) {
  const {
    i18n: { dir, language },
  } = useTranslation();
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  return (
    <div dir={dir(language)}>
      <LayoutStateContext.Provider
        value={{ isSidebarOpened, setIsSidebarOpened }}
      >
        {children}
      </LayoutStateContext.Provider>
    </div>
  );
}

function useLayoutState() {
  const context = useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

export { LayoutProvider, useLayoutState };
