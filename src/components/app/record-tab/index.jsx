import React, { useState, useEffect, useMemo } from 'react';
import propTypes from 'prop-types';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import pieces from '@pieces';
import piecesById from '@pieces/by-id';
import ControlButtonComponent from '../controls/control-button';
import './record-tab.scss';

const MAX_RECORDING_LENGTH_MINUTES = 240;

const getGeneratedRecordingsQueue = generatedRecordings =>
  Reflect.ownKeys(generatedRecordings)
    .map(recordingId => generatedRecordings[recordingId])
    .sort((a, b) => a.queuedAtTime - b.queuedAtTime);

const RecordTabComponent = ({
  selectedPieceId,
  selectPiece,
  queueRecordingGeneration,
  generatedRecordings,
  lastRecordingGenerationLength,
  removeRecordingGeneration,
  startRecordingGeneration,
}) => {
  if (selectedPieceId === null) {
    selectPiece(pieces[0].id);
  }
  const [recordingLengthInMinutes, setRecordingLengthInMinutes] = useState(
    lastRecordingGenerationLength
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

  const getIsRecordingValid = () =>
    selectedPiece.isRecordable &&
    recordingLengthInMinutes > 0 &&
    recordingLengthInMinutes <= MAX_RECORDING_LENGTH_MINUTES;

  const [isRecordingValid, setIsRecordingValid] = useState(
    getIsRecordingValid()
  );

  useEffect(() => {
    setIsRecordingValid(getIsRecordingValid());
  }, [selectedPiece, recordingLengthInMinutes]);

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div className="centered-tab record-tab">
      This page enables you to generate and download recordings. Recording
      generation may take a while, and longer recordings require more time to
      generate. Music playback is not supported while recording generation is in
      progress.
      <form onSubmit={handleSubmit}>
        <div className="form-group recording-entry">
          <span>
            Record
            <input
              type="number"
              id="length-input"
              min="1"
              max={MAX_RECORDING_LENGTH_MINUTES}
              value={recordingLengthInMinutes}
              onChange={event =>
                setRecordingLengthInMinutes(event.target.value)
              }
              required
            />
            minutes of
            <select
              id="piece-select"
              value={selectedPieceId}
              onChange={event => selectPiece(event.target.value)}
            >
              {pieces.map(({ title, id, isRecordable }) => (
                <option key={id} value={id} disabled={!isRecordable}>
                  {title}
                </option>
              ))}
            </select>
          </span>
          {isRecordingValid && (
            <ControlButtonComponent
              faIcon={faPlus}
              onClick={() =>
                queueRecordingGeneration({
                  pieceId: selectedPieceId,
                  lengthInMinutes: recordingLengthInMinutes,
                })
              }
            />
          )}
          {!isRecordingValid && <div className="btn-spacer" />}
        </div>
        {!selectedPiece.isRecordable && (
          <div className="form-group invalid-msg">{`${
            selectedPiece.title
          } is not recordable.`}</div>
        )}
        {(recordingLengthInMinutes <= 0 ||
          recordingLengthInMinutes > MAX_RECORDING_LENGTH_MINUTES) && (
          <div className="form-group invalid-msg">
            Recording length must be between 1 and 240 minutes
          </div>
        )}
        <div className="form-group">
          {generatedRecordingsQueue.filter(({ url }) => url === '').length >
            0 &&
            !isGenerationInProgress && (
              <button
                className="btn"
                type="button"
                onClick={() =>
                  startRecordingGeneration(
                    generatedRecordingsQueue[0].recordingId
                  )
                }
              >
                Resume Generation
              </button>
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
                      download={`${pieceId}-${lengthInMinutes}-minutes.wav`}
                    >
                      {displayText}
                    </a>
                  )}
                  {!isInProgress && (
                    <ControlButtonComponent
                      faIcon={faTimes}
                      onClick={() => removeRecordingGeneration(recordingId)}
                    />
                  )}
                  {isInProgress && <div className="btn-spacer" />}
                </li>
              );
            })}
          </ul>
        </div>
      </form>
      {selectedPiece.isRecordable && (
        <span>
          <br />
          <br />
          <a
            rel="license noreferrer noopener"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            className="centered-content"
          >
            <img
              alt="Creative Commons License"
              style={{ borderWidth: 0 }}
              src="https://i.creativecommons.org/l/by/4.0/80x15.png"
            />
          </a>
          <br />
          <span className="centered-content">
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
        </span>
      )}
    </div>
  );
};

RecordTabComponent.propTypes = {
  selectedPieceId: propTypes.string.isRequired,
  selectPiece: propTypes.func.isRequired,
  queueRecordingGeneration: propTypes.func.isRequired,
  generatedRecordings: propTypes.object.isRequired,
  lastRecordingGenerationLength: propTypes.string.isRequired,
  removeRecordingGeneration: propTypes.func.isRequired,
  startRecordingGeneration: propTypes.func.isRequired,
};

export default RecordTabComponent;
