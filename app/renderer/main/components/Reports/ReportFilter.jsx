import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Cell, Button, Textfield, RadioGroup, Radio } from 'react-mdl';

function ReportFilter({ fields: { fromDate, toDate, groupBy }, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Cell col={12}>
          <Textfield {...fromDate} type="date" label="from" floatingLabel />
          <Textfield {...toDate} type="date" label="to" floatingLabel />
          <RadioGroup {...groupBy}>
            <Radio value="day" ripple>Day</Radio>
            <Radio value="week" ripple>Week</Radio>
          </RadioGroup>
          <Button type="submit" primary ripple>Submit</Button>
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
