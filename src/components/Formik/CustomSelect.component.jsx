import React, { useState } from 'react';
import Select from 'react-select';
import { uniq as _uniq } from 'lodash';

export const CustomSelect = ({
  className,
  placeholder,
  form,
  field,
  options,
  isMulti = false,
  initialValues,
}) => {
  const [selected, setSelected] = useState(initialValues);
  const [updatedFlag, setUpdatedFlag] = useState('false');

  const onChange = (option) => {
    setUpdatedFlag('true');
    setSelected(option);
    form.setFieldValue(field.name, isMulti ? option.map((item) => item) : option.value);
  };

  return (
    <Select
      className={className}
      name={field.name}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      value={updatedFlag === 'false' ? _uniq([...selected, ...initialValues]) : selected}
    />
  );
};

export default CustomSelect;
