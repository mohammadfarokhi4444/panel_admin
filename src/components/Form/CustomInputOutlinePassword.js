import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useField } from "formik";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  width: "90% !important",
  margin: "15px 0px",
  "& input": {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
    },
  },
}));
const CustomInputOutlinePassword = ({ name, disabled }) => {
  const [visibility, setVisibility] = useState(false);

  const handleClick = () => {
    setVisibility(!visibility);
  };

  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    disabled: !!disabled,
    fullWidth: true,
    variant: "outlined",
    type: visibility ? "password" : "text",
  };
  if (meta && meta.error && meta.touched) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextFieldCustom
      InputProps={{
        style: {
          flexDirection: "row-reverse",
        },
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <IconButton onClick={handleClick}>
              {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...configTextField}
    />
  );
};

export default CustomInputOutlinePassword;
