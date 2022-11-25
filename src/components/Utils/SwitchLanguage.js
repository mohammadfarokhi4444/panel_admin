import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const SwitchLanguage = ({ setProfileMenu }) => {
  const { i18n } = useTranslation();
  const newLang = i18n.language == "fa" ? "en" : "fa";
  return (
    <Button
      onClick={() => {
        i18n.changeLanguage(newLang, () => {
          window.location.reload();
        });
        if (setProfileMenu) setProfileMenu(false);
        localStorage.setItem("lang", newLang);
      }}
    >
      {newLang}
    </Button>
  );
};

export default SwitchLanguage;
