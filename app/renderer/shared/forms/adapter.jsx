/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Textfield, RadioGroup, Radio } from 'react-mdl';
import styles from './adapter.css';

export const TOGGLE = 'TOGGLE';
export const TEXT = 'TEXT';
export const PASSWORD = 'PASSWORD';
export const DATE = 'DATE';
export const RADIO_GROUP = 'RADIO_GROUP';

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

    default:
      return null;
  }
}
