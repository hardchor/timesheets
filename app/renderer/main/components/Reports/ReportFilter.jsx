import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Cell, Textfield, RadioGroup, Radio } from 'react-mdl';
import styles from './reportFilter.css';

function ReportFilter({ fields: { fromDate, toDate, groupBy }, handleSubmit }) {
  function onChange() {
    setTimeout(handleSubmit, 0);
  }

  return (
    <form onSubmit={handleSubmit} onChange={onChange}>
      <Grid>
        <Cell col={12}>
          <Textfield {...fromDate} type="date" label="from" floatingLabel />
          <Textfield {...toDate} type="date" label="to" floatingLabel />
          <RadioGroup {...groupBy}>
            <Radio value="day" className={styles.radio} ripple>Day</Radio>
            <Radio value="week" className={styles.radio} ripple>Week</Radio>
          </RadioGroup>
        </Cell>
      </Grid>
    </form>
  );
}

ReportFilter.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'reportFilter',
  fields: ['fromDate', 'toDate', 'groupBy'],
})(ReportFilter);
