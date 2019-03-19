import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TitleNavComponent from '../components/app/title-nav';

const mapStateToProps = ({ isUpdateAvailable }) => ({ isUpdateAvailable });

export default withRouter(connect(mapStateToProps)(TitleNavComponent));
