import React, { useState } from 'react';
import Popover from 'react-tiny-popover';
import LinkButton from '@components/shared/link-button';
import './drop-down.scss';

const Dropdown = ({ options, selected, onSelect, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectAndClose = option => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onClickOutside={() => setIsOpen(false)}
      disableReposition="true"
      position="bottom"
      padding={-15}
      transitionDuration="0"
      content={
        <ul className="drop-down-menu">
          {options.map(option => (
            <li key={option} className="drop-down-menu__item">
              <button
                type="button"
                className="drop-down-menu__item__btn"
                onClick={() => selectAndClose(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      }
    >
      <LinkButton
        title={title}
        onClick={() => setIsOpen(currentIsOpen => !currentIsOpen)}
      >
        {selected}
      </LinkButton>
    </Popover>
  );
};

export default Dropdown;
