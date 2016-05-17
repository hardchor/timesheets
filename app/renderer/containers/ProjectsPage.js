import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Projects from '../components/Projects';
import * as ProjectActions from '../../shared/actions/project';
import * as JobActions from '../../shared/actions/job';
import { push } from 'react-router-redux';

function mapStateToProps({ project }) {
  return {
    project,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(ProjectActions, dispatch),
    ...bindActionCreators(JobActions, dispatch),
    ...bindActionCreators({ navigate: push }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
