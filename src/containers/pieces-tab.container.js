import { connect } from 'react-redux';
import PiecesTabComponent from '../components/app/pieces-tab';
import selectPiece from '../store/actions/creators/select-piece.creator';
import stop from '../store/actions/creators/stop.creator';
import play from '../store/actions/creators/play.creator';

const mapStateToProps = ({ selectedPieceId, isPlaying, playTime }) => ({
  selectedPieceId,
  isPlaying,
  playTime,
});

const mapDispatchToProps = {
  onPieceClick: ({ id }) => selectPiece(id),
  onStopClick: stop,
  onPlayClick: play,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PiecesTabComponent);
