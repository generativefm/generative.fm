const isRecordingGenerationInProgress = generatedRecordings =>
  Reflect.ownKeys(generatedRecordings).some(
    recordingId => generatedRecordings[recordingId].isInProgress
  );

export default isRecordingGenerationInProgress;
