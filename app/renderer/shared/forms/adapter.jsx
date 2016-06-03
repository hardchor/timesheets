/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Textfield, RadioGroup, Radio, Checkbox } from 'react-mdl';
import { Field } from 'redux-form';
import styles from './adapter.css';

export const TOGGLE = 'TOGGLE';
export const TEXT = 'TEXT';
export const PASSWORD = 'PASSWORD';
export const DATE = 'DATE';
export const TIME = 'TIME';
export const RADIO_GROUP = 'RADIO_GROUP';
export const CHECKBOX = 'CHECKBOX';
export const CHECKBOXES = 'CHECKBOXES';

export default function adapter(key, props) {
  switch (key) {
    case TOGGLE:
      return (
        <Switch {...props}>
          {props.label}
        </Switch>
      );

    case TEXT:
      return (
        <Textfield {...props} floatingLabel />
      );

    case PASSWORD:
      return (
        <Textfield {...props} type="password" floatingLabel />
      );

    case DATE:
      return (
        <Textfield {...props} type="date" floatingLabel />
      );

    case TIME:
      return (
        <Textfield {...props} type="time" className={styles.time} floatingLabel />
      );

    case RADIO_GROUP:
      return (
        <RadioGroup {...props}>
          {props.options.map((option) => (
            <Radio key={option.value} value={option.value} className={styles.radio} ripple>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      );

    case CHECKBOX:
      return (
        <Checkbox {...props} className={styles.radio} ripple />
      );


    case CHECKBOXES:
      return (
        <div>
          {props.options.map((option, index) => (
            <Field
              key={index}
              name={`${props.name}[${option.value}]`}
              label={option.label}
              checked={!!props.value[option.value]}
              component={CHECKBOX}
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}
