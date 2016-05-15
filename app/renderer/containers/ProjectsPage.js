import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Projects from '../components/Projects';
import * as ProjectActions from '../../shared/actions/project';
import * as JobActions from '../../shared/actions/job';

function mapStateToProps(state) {
  return {
    project: state.project,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(ProjectActions, dispatch),
    ...bindActionCreators(JobActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
