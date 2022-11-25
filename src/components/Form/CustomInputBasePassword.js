import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useField } from "formik";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  width: "80% !important",
  margin: "15px 0px",
  "& input": {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.default} inset !important`,
    },
  },
  "& .MuiInput-root:before": {
    borderBottom: `solid ${theme.palette.primary.main} 1px `,
  },
  "& input::placeholder": {
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
    fontSize: "16px",
    paddingBottom: "5px",
  },
}));
const CustomInputBasePassword = ({ name, ...otherProps }) => {
  const [visibility, setVisibility] = useState(true);

  const handleClick = () => {
    setVisibility(!visibility);
  };

  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "standard",
    type: visibility ? "password" : "text",
  };
  if (meta && meta.error && meta.touched) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextFieldCustom
      InputProps={{
        // disableUnderline: true,
        style: {
          borderRadius: "10px",
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

export default CustomInputBasePassword;
