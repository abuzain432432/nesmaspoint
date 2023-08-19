import React from "react";
import Select from "react-select";

export default function MultiSelect({
  isMulti,
  value,
  setValue,
  options,
  name,
  placeholder,
  onBlur,
  onFocus,
  hasError,
}) {
  const onChangeHandler = (e) => {
    setValue(e);
  };

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      height: "45px",
      borderRadius: "6px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
      };
    },
  };
  return (
    <Select
      styles={selectStyles}
      isMulti={isMulti}
      name={name}
      options={options}
      className={`basic-multi-select ${hasError ? "mb-1" : "mb-4"}`}
      classNamePrefix="select"
      onChange={onChangeHandler}
      placeholder={placeholder}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
