import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  width: "90% !important",
  margin: "15px 0px",
  "& input": {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
    },
  },
}));
const CustomInputOutlineDisable = ({ name, defaultValue }) => {
  const configTextField = {
    name,
    defaultValue,
    disabled: true,
    fullWidth: true,
    variant: "outlined",
  };
  return <TextFieldCustom {...configTextField} />;
};

export default CustomInputOutlineDisable;
