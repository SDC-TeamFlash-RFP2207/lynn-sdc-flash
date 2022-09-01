import React from "react";
import styled from "styled-components";

const DropDown = ({ label, options, onChange }) => {
  return (
    <Select onChange={onChange} defaultValue={label}>
      <option value={label} disabled hidden>
        {label}
      </option>
      >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.value}
        </option>
      ))}
    </Select>
  );
};

export default DropDown;

const Select = styled.select`
  font-size: large;
  borer-raius: 10px;
  box-shadow: 3px 3px 10px rgb(0, 0, 0);
`;