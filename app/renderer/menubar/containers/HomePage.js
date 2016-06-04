import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as JobActions from '../../../shared/actions/job';
import * as SettingsActions from '../../../shared/actions/settings';

function mapStateToProps({ job, project, settings }) {
  return { job, project, settings };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(JobActions, dispatch),
    ...bindActionCreators(SettingsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
