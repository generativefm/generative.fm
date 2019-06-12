import { connect } from 'react-redux';
import CurrentlyPlayingComponent from '../components/app/controls/currently-playing';

const mapStateToProps = ({ selectedPieceId, isPlaying }) => ({
  selectedPieceId,
  isPlaying,
});

export default connect(mapStateToProps)(CurrentlyPlayingComponent);
