import { connect } from 'react-redux';
import AppComponent from '../components/app';

const mapStateToProps = ({ activeTabId }) => ({ activeTabId });

export default connect(mapStateToProps)(AppComponent);
