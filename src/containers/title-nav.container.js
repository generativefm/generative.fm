import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TitleNavComponent from '@components/app/title-nav';
import dismissNotification from '@store/actions/creators/dismiss-notification.creator';
import promptInstallation from '@store/actions/creators/prompt-installation.creator';

const mapStateToProps = ({
  isUpdateAvailable,
  notifications,
  isInstallable,
  isOnline,
}) => ({
  isUpdateAvailable,
  isInstallable,
  isOnline,
  notifications: notifications.filter(({ isDismissed }) => !isDismissed),
});

export default withRouter(
  connect(mapStateToProps, { dismissNotification, promptInstallation })(
    TitleNavComponent
  )
);
