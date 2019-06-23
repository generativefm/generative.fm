import React, { useState } from 'react';
import propTypes from 'prop-types';
import Popover from 'react-tiny-popover';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@components/shared/icon-button';
import './more-button.scss';

const execCommandCopy = text => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

const clipboardApiCopy = text => navigator.clipboard.writeText(text);

const copyFn = navigator.clipboard ? clipboardApiCopy : execCommandCopy;

const MoreButton = ({ pieceId, className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const copyLinkToClipboard = () => {
    const link = `${location.origin}/music/${pieceId}`;
    copyFn(link);
    setIsMenuOpen(false);
  };

  return (
    <Popover
      isOpen={isMenuOpen}
      onClickOutside={() => setIsMenuOpen(false)}
      content={
        <div className="more-btn__menu">
          <button
            type="button"
            className="more-btn__menu__btn"
            onClick={() => copyLinkToClipboard()}
          >
            Copy link to piece
          </button>
        </div>
      }
      align="end"
      disableReposition="true"
      padding="-25"
      transitionDuration="0"
    >
      <IconButton
        faIcon={faEllipsisH}
        className={className}
        title="More..."
        onClick={() => setIsMenuOpen(currentIsMenuOpen => !currentIsMenuOpen)}
      />
    </Popover>
  );
};

MoreButton.propTypes = {
  pieceId: propTypes.string.isRequired,
  className: propTypes.string,
};

export default MoreButton;
