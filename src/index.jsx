import React from 'react';
import { render } from 'react-dom';
import Player from './components/player';
import pieces from './pieces';

render(<Player piece={pieces[0]} />, document.getElementById('root'));
