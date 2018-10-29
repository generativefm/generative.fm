import { connect } from 'react-redux';
import PiecesTabComponent from '../components/app/pieces-tab';
import selectPiece from '../store/actions/creators/select-piece.creator';

const mapStateToProps = ({ selectedPieceId, isPlaying }) => ({
  selectedPieceId,
  isPlaying,
});

const mapDispatchToProps = { onPieceClick: ({ id }) => selectPiece(id) };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PiecesTabComponent);
