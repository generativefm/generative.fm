import { connect } from 'react-redux';
import recordTabComponent from '@components/app/record-tab';
import selectPiece from '@store/actions/creators/select-piece.creator';
import queueRecordingGeneration from '@store/actions/creators/queue-recording-generation.creator';
import removeRecordingGeneration from '@store/actions/creators/remove-recording-generation.creator';
import startRecordingGeneration from '@store/actions/creators/start-recording-generation.creator';

const mapStateToProps = ({
  selectedPieceId,
  generatedRecordings,
  lastRecordingGenerationLength,
}) => ({
  selectedPieceId,
  generatedRecordings,
  lastRecordingGenerationLength,
});

export default connect(
  mapStateToProps,
  {
    selectPiece,
    queueRecordingGeneration,
    removeRecordingGeneration,
    startRecordingGeneration,
  }
)(recordTabComponent);
