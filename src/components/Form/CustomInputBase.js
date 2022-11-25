import {
  TextField,
} from "@mui/material";
import { useField } from "formik";
import { styled } from "@mui/material/styles";

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
  // "& .MuiFilledInput-root": {
  //   // backgroundColor: theme.palette.primary.light,
  //   borderRaduis: "50px",
  //   color: theme.palette.primary.main,
  // },
  // "& input[type=number]": {
  //   "-moz-appearance": "textfield",
  // },
  // "& input[type=number]::-webkit-outer-spin-button": {
  //   "-webkit-appearance": "none",
  //   margin: 0,
  // },
  // "& input[type=number]::-webkit-inner-spin-button": {
  //   "-webkit-appearance": "none",
  //   margin: 0,
  // },
}));
const CustomInputBase = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "standard",
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
        },
      }}
      {...configTextField}
    />
  );
};

export default CustomInputBase;
