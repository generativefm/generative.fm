import React from 'react';
import { render } from 'react-dom';
import Player from './components/player';
import piece from './pieces/aisatsana';

render(<Player piece={piece} />, document.getElementById('root'));
