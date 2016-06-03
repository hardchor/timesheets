import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Cell } from 'react-mdl';
import adapter, { DATE, RADIO_GROUP } from '../../../shared/forms/adapter';

function ReportFilter({ handleSubmit }) {
  function onChange() {
    setTimeout(handleSubmit, 0);
  }

  const groupByOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
  ];

  return (
    <form onSubmit={handleSubmit} onChange={onChange}>
      <Grid>
        <Cell col={12}>
          <Field name="fromDate" label="From" component={DATE} />
          <Field name="toDate" label="To" component={DATE} />
          <Field name="groupBy" options={groupByOptions} component={RADIO_GROUP} />
        </Cell>
      </Grid>
    </form>
  );
}

ReportFilter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'reportFilter',
  adapter,
})(ReportFilter);
