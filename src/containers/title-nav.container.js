import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TitleNavComponent from '@components/app/title-nav';
import dismissNotification from '@store/actions/creators/dismiss-notification.creator';

const mapStateToProps = ({ isUpdateAvailable, notifications }) => ({
  isUpdateAvailable,
  notifications: notifications.filter(({ isDismissed }) => !isDismissed),
});

export default withRouter(
  connect(
    mapStateToProps,
    { dismissNotification }
  )(TitleNavComponent)
);
