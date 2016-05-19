import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as JobActions from '../../../shared/actions/job';

function mapStateToProps({ job }) {
  return { job };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(JobActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
