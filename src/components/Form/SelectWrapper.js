import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };
  const configTextField = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    // fullWidth: true,
    onChange: handleChange,
  };
  if (meta && meta.error && meta.touched) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextField {...configTextField} sx={{ width: "90%", m: "15px 0px" }}>
      {options.map((el, index) => {
        return (
          <MenuItem key={index} value={el.name}>
            {el.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
