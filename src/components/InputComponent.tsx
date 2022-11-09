import React from "react";
import {cmToInch} from "../helpers";
import "../styles.css"
const InputComponent = ({register, name, errorMessage, min, max, label, isInches}: any) => {
  return (
    <div className="form">
      <label>{label}</label>
      <input
        {...register(name, {
          valueAsNumber: true,
          required: true,
          validate: (value: number) => {
            if (!(value > 0))
              return 'Only numbers'
            if (value < cmToInch(min, isInches))
              return `Must be more or equal ${cmToInch(min, isInches)}`
            if (value > cmToInch(max, isInches))
              return `Must be less or equal ${cmToInch(max, isInches)}`
            return true
          }
        })}
      />
      <div className="error">
      {errorMessage}
      </div>
    </div>
  );
};

export default InputComponent;
