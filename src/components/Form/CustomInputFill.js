import {
  TextField,
} from "@mui/material";
import { useField } from "formik";
import { styled } from "@mui/material/styles";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  // height: "100px",
  width: "80% !important",
  margin: "15px 0px",
  "& input": {
    // color: "primary.main",
    // fontSize: 29,
    // fontWeight: 500,
    // height: "50px",
    // paddingBottom: "50px",
    // borderRadius: "80px !important",
  },
  "& input::placeholder": {
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
    fontSize: "16px",
    paddingBottom: "5px",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: theme.palette.primary.light,
    borderRaduis: "50px",
    color: theme.palette.primary.main,
  },
  "& .MuiFilledInput-input": {
    "&:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0 100px #F3F3F3 inset",
      "-webkit-text-fill-color": "#134379",
    },
  },
  "& input[type=number]": {
    "-moz-appearance": "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
}));
const CustomInputFill = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "filled", //outlined
  };
  if (meta && meta.error && meta.touched) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextFieldCustom
      InputProps={{
        disableUnderline: true,
        style: {
          borderRadius: "10px",
        },
      }}
      {...configTextField}
    />
  );
};

export default CustomInputFill;
