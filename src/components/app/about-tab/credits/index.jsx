import React from 'react';
import './credits.scss';

const supporters = [
  'theunis',
  'Lisa Sieverts',
  'James',
  'Anton Mironov',
  'Price Comstock',
  //   'Jay Zehngebot',
  'Bruz Marzolf',
  'Matthew William Whisennand',
  'Dan Carr',
  'Stephen Turner',
  //   'Lorenzo Burgio',
  'Tim Van Damme',
  'Michael Gehrmann',
  'Martin Stubbs',
  'Oleksandr Bugor',
  'Zarremgregarrok',
  'Catherine Desrochers',
  'Douglas Fils',
  'KingOfHearts',
  'John',
  'Fred - FLQ',
  'Eric Turner',
  'Emily M Kaplan',
  'James Finazzo',
  'Tommy Dylan',
  'adnan chowdhury',
];
const majorSupporters = [
  'Brian Fountain',
  'Christian DeWolf',
  'Sam Roelants',
  // 'Papuna Gagnidze',
  'Russ Creech',
  'Adam M. Smith',
  'Joël Franusic',
  'Vijay Das',
];

const Credits = () => (
  <div className="credits">
    Thank you to the incredible Patrons who keep this project going:
    <div className="credits__supporters">
      {majorSupporters.map(name => (
        <div key={name} className="credits__name credits__name--major">
          {name}
        </div>
      ))}
    </div>
    <div className="credits__supporters">
      {supporters.map(name => (
        <div key={name} className="credits__name">
          {name}
        </div>
      ))}
    </div>
  </div>
);

export default Credits;
