import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Github from '../components/Github';
import * as GithubActions from '../../../shared/actions/github';

function mapStateToProps({ github, project }) {
  return { github, project };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GithubActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);
