import React from 'react';
import './about.scss';

const AboutTabComponent = () => (
  <div className="about-tab">
    <p>
      This site is a collection of &quot;generative music&quot; pieces which are
      performed live in your browser. The term &quot;generative music&quot; has
      been used especially by Brian Eno to describe music which changes
      continously and is created by a system. Such systems often generate unique
      music forever (or at least as long as one is willing to listen).
    </p>
    <p>
      The pieces featured on this site are not recordings; the music that can be
      heard is generated according to a different system created for each piece.
      These systems have been designed such that each performance is almost
      guaranteed to be unique and will last as long as they are permitted to by
      the listener. And yet, while no two performances will be quite the same,
      the listener will undoubtedly find multiple performances of the same piece
      sound similar.
    </p>
    <p>
      While not a requirement of generative music, most of the pieces featured
      are quite minimal and ambient. Here &quot;ambient&quot; means the music is
      intended to enhance one&apos;s environment without requiring attention.
    </p>
  </div>
);

export default AboutTabComponent;
