import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Projects from '../components/Projects';
import * as ProjectActions from '../../shared/actions/project';

function mapStateToProps(state) {
  return {
    project: state.project
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
