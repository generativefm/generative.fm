import React, { useState, useEffect, useMemo } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import pieces from '@pieces';
import piecesById from '@pieces/by-id';
import ControlButtonComponent from '../controls/control-button';
import './record-tab.scss';

const DEFAULT_RECORDING_LENGTH_MINUTES = 10;

const getGeneratedRecordingsQueue = generatedRecordings =>
  Reflect.ownKeys(generatedRecordings)
    .map(recordingId => generatedRecordings[recordingId])
    .sort((a, b) => a.queuedAtTime - b.queuedAtTime);

const RecordTabComponent = ({
  selectedPieceId,
  selectPiece,
  queueRecordingGeneration,
  generatedRecordings,
  removeRecordingGeneration,
}) => {
  const [recordingLengthInMinutes, setRecordingLengthInMinutes] = useState(
    DEFAULT_RECORDING_LENGTH_MINUTES
  );

  const selectedPiece = useMemo(() => piecesById[selectedPieceId], [
    selectedPieceId,
  ]);

  const [generatedRecordingsQueue, setGeneratedRecordingsQueue] = useState(
    getGeneratedRecordingsQueue(generatedRecordings)
  );

  const [isGenerationInProgress, setIsGenerationInProgress] = useState(false);

  useEffect(() => {
    const queue = getGeneratedRecordingsQueue(generatedRecordings);
    setGeneratedRecordingsQueue(queue);
    setIsGenerationInProgress(queue.some(({ isInProgress }) => isInProgress));
  }, [generatedRecordings]);

  const handleSubmit = event => {
    queueRecordingGeneration({
      pieceId: selectedPieceId,
      lengthInMinutes: recordingLengthInMinutes,
    });
    event.preventDefault();
  };

  return (
    <div className="centered-tab record-tab">
      Generate a recording of a piece.
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="piece-select">Piece:</label>
          <select
            id="piece-select"
            value={selectedPieceId}
            onChange={event => selectPiece(event.target.value)}
          >
            {pieces.map(({ title, id }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="length-input">Minutes:</label>
          <input
            type="number"
            id="length-input"
            min="1"
            max="240"
            value={recordingLengthInMinutes}
            onChange={event => setRecordingLengthInMinutes(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add to Queue</button>
          {generatedRecordingsQueue.filter(({ url }) => url === '').length >
            0 &&
            !isGenerationInProgress && (
              <button type="button">Start Generation</button>
            )}
        </div>
        <div className="form-group">
          <ul className="generated-recordings-queue">
            {generatedRecordingsQueue.map(generatedRecording => {
              const {
                recordingId,
                lengthInMinutes,
                url,
                pieceId,
                isInProgress,
              } = generatedRecording;
              let status = '';
              if (isInProgress) {
                status = ' - generating...';
              } else if (url === '') {
                status = ' - waiting to generate';
              }
              const displayText = `${lengthInMinutes} minutes of ${
                piecesById[pieceId].title
              }${status}`;
              return (
                <li
                  key={recordingId}
                  className="generated-recordings-queue__item"
                >
                  {url === '' ? (
                    <span>{displayText} </span>
                  ) : (
                    <a
                      href={url}
                      download={`${pieceId}-${lengthInMinutes}-minutes`}
                    >
                      {displayText}
                    </a>
                  )}
                  <ControlButtonComponent
                    faIcon={faTimes}
                    onClick={() => removeRecordingGeneration(recordingId)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </form>
      {selectedPieceId && (
        <span>
          <br />
          <a
            rel="license noreferrer noopener"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            <img
              alt="Creative Commons License"
              style={{ borderWidth: 0 }}
              src="https://i.creativecommons.org/l/by/4.0/80x15.png"
            />
          </a>
          <br />
          {selectedPiece.title} (Excerpt) by{' '}
          <a
            href="https://alexbainter.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Alex Bainter
          </a>{' '}
          is licensed under a{' '}
          <a
            rel="license noreferrer noopener"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            Creative Commons Attribution 4.0 International License
          </a>
          .
        </span>
      )}
    </div>
  );
};

export default RecordTabComponent;
