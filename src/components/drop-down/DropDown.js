import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name Dropdown
 * @description Input field
 * @return component
 */
const Dropdown = ({
  onChange, value, id, label, options, errors, defaultValue
}) => (
  <div style={{ width: '200px', display: 'inline-block' }}>
    <label className={styles.formLabel} htmlFor={id}>
      {label}
      <div>
        <select
          className={`${styles.formInput} ${errors ? styles.errorBorder : ''}`}
          id={id}
          onBlur={onChange}
          onChange={onChange}
          value={value}
          errors={errors}
          defaultValue={defaultValue}
        >
          {options.map((optionText) => (
            <option
              value={optionText}
              key={optionText}
            >
              {optionText}
            </option>
          ))}
        </select>
      </div>
      <p className={errors ? styles.errorNone : styles.errorHidden}>Required</p>
      {errors && <p className={errors ? styles.errorShow : styles.errorHidden}>{errors}</p>}
    </label>
  </div>
);

export default Dropdown;
