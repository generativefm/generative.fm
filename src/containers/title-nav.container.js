import { connect } from 'react-redux';
import TitleNavComponent from '../components/app/title-nav';
import selectTab from '../store/actions/creators/select-tab.creator';

const mapStateToProps = ({ activeTabId }) => ({ activeTabId });

const mapDispatchToProps = { onTabClick: selectTab };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleNavComponent);
