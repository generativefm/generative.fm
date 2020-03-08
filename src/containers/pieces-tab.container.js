import { connect } from 'react-redux';
import isRecordingGenerationInProgress from '@utils/is-recording-generation-in-progress';
import PiecesTabComponent from '@components/app/pieces-tab';
import selectPiece from '@store/actions/creators/select-piece.creator';
import stop from '@store/actions/creators/stop.creator';
import play from '@store/actions/creators/play.creator';
import addFavorite from '@store/actions/creators/add-favorite.creator';
import removeFavorite from '@store/actions/creators/remove-favorite.creator';
import changeFilter from '@store/actions/creators/change-filter.creator';
import changeSorting from '@store/actions/creators/change-sorting.creator';

const mapStateToProps = ({
  selectedPieceId,
  isPlaying,
  playTime,
  loadingPieceBuildId,
  generatedRecordings,
  favorites,
  filter,
  sorting,
  visiblePieceIds,
  isOnline,
}) => ({
  selectedPieceId,
  isPlaying,
  playTime,
  favorites,
  filter,
  sorting,
  visiblePieceIds,
  isOnline,
  isLoading: loadingPieceBuildId !== '',
  isRecordingGenerationInProgress: isRecordingGenerationInProgress(
    generatedRecordings
  ),
});

const mapDispatchToProps = {
  addFavorite,
  removeFavorite,
  changeFilter,
  changeSorting,
  onPieceClick: ({ id }) => selectPiece(id),
  onStopClick: stop,
  onPlayClick: play,
};

export default connect(mapStateToProps, mapDispatchToProps)(PiecesTabComponent);
