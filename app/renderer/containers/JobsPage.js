import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Jobs from '../components/Jobs';
import * as JobActions from '../../shared/actions/job';

function mapStateToProps(state) {
  return {
    job: state.job
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(JobActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
