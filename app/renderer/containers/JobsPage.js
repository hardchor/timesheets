import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Jobs from '../components/Jobs';
import * as JobActions from '../../shared/actions/job';

function mapStateToProps({ job, project }) {
  return { job, project };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(JobActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
