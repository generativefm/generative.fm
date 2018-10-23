import svg from 'svg.js';
import colorSchemes from 'nice-color-palettes/1000';

const createVisualization = containerElement => {
  const TWO = 2;
  const STROKE_WIDTH_DIVISOR = 100;
  const LENGTH = 55;
  const STROKE_WIDTH = Math.max(LENGTH / STROKE_WIDTH_DIVISOR, 1);
  const DIAGONAL = Math.ceil(
    Math.sqrt(TWO * LENGTH * LENGTH) + TWO * STROKE_WIDTH
  );
  const HALF_DIAGONAL = DIAGONAL / TWO;
  const HALF_LENGTH = LENGTH / TWO;
  const HALF_STROKE_WIDTH = STROKE_WIDTH / TWO;
  const ANIMATION_TIME_MS = 10000;
  const TRI_CLIP_SIZE = HALF_LENGTH + STROKE_WIDTH;
  const P_ROTATE = 0.25;
  const P_RECT = 0.4;
  const P_SQR = 0.2;
  const P_TRI = 0.1;
  const P_50_PCT = 0.5;
  const P_FILL = P_50_PCT;
  const P_FILL_BLACK = P_50_PCT;
  const ROTATION_ANGLE = 90;
  const INTERVAL_TIME_MS = ANIMATION_TIME_MS * TWO;
  const OFFSET = (DIAGONAL - LENGTH) / TWO;

  const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];
  const getRandomColorScheme = () => getRandomElement(colorSchemes);

  let colors;

  const setNewColorScheme = () => {
    colors = getRandomColorScheme();
  };

  setNewColorScheme();

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const draw = svg(containerElement).size(DIAGONAL, DIAGONAL);

  const stroke = el =>
    el.attr({
      stroke: 'black',
      'stroke-width': STROKE_WIDTH,
      'fill-opacity': 0,
    });

  const strokeAndFill = (el, fill = getRandomColor()) =>
    el.attr({
      'fill-opacity': 1,
      stroke: 'black',
      'stroke-width': STROKE_WIDTH,
      fill,
    });

  const shape = el =>
    el
      .attr({
        'fill-opacity': 0,
      })
      .dmove(OFFSET, OFFSET);

  const rect = (w, h) => shape(draw.rect(w, h));

  const triClip = sqr =>
    sqr
      .clone()
      .size(TRI_CLIP_SIZE, TRI_CLIP_SIZE)
      .dmove(-HALF_STROKE_WIDTH, -HALF_STROKE_WIDTH);

  const tri = (x1, y1, x2, y2, clipper) =>
    shape(
      draw.polygon(`${x1},${y1} ${x2},${y2} ${HALF_LENGTH},${HALF_LENGTH}`)
    ).clipWith(clipper);

  const container = rect(LENGTH, LENGTH);
  stroke(container);

  const tRect = rect(LENGTH, HALF_LENGTH);
  const bRect = rect(LENGTH, HALF_LENGTH).dmove(0, HALF_LENGTH);
  const lRect = rect(HALF_LENGTH, LENGTH);
  const rRect = rect(HALF_LENGTH, LENGTH).dmove(HALF_LENGTH, 0);
  const sqrTl = rect(HALF_LENGTH, HALF_LENGTH);
  const sqrTr = rect(HALF_LENGTH, HALF_LENGTH).dmove(HALF_LENGTH, 0);
  const sqrBl = rect(HALF_LENGTH, HALF_LENGTH).dmove(0, HALF_LENGTH);
  const sqrBr = rect(HALF_LENGTH, HALF_LENGTH).dmove(HALF_LENGTH, HALF_LENGTH);

  const tlClipper = draw.clip().add(triClip(sqrTl));
  const t1 = tri(0, 0, 0, HALF_LENGTH, tlClipper);
  const t2 = tri(0, 0, HALF_LENGTH, 0, tlClipper);
  const trClipper = draw.clip().add(triClip(sqrTr));
  const t3 = tri(HALF_LENGTH, 0, LENGTH, 0, trClipper);
  const t4 = tri(LENGTH, 0, LENGTH, HALF_LENGTH, trClipper);
  const blClipper = draw.clip().add(triClip(sqrBl));
  const t5 = tri(0, HALF_LENGTH, 0, LENGTH, blClipper);
  const t6 = tri(0, LENGTH, HALF_LENGTH, LENGTH, blClipper);
  const brClipper = draw.clip().add(triClip(sqrBr));
  const t7 = tri(HALF_LENGTH, LENGTH, LENGTH, LENGTH, brClipper);
  const t8 = tri(LENGTH, LENGTH, LENGTH, HALF_LENGTH, brClipper);

  const rectangles = [tRect, bRect, lRect, rRect];
  const squares = [sqrTl, sqrTr, sqrBl, sqrBr];
  const triangles = [t1, t2, t3, t4, t5, t6, t7, t8];

  const allShapes = rectangles.concat(squares).concat(triangles);

  const group = draw.group();
  allShapes
    .concat([container, tlClipper, trClipper, blClipper, brClipper])
    .forEach(s => {
      group.add(s);
    });

  const makeNext = (animate = true, changeScheme = false) => {
    if (changeScheme) {
      setNewColorScheme();
    }
    if (Math.random() >= P_ROTATE || !animate) {
      [[rectangles, P_RECT], [squares, P_SQR], [triangles, P_TRI]].forEach(
        ([shapes, p]) => {
          shapes.forEach(s => {
            const el = animate ? s.animate(ANIMATION_TIME_MS, '-') : s;
            if (Math.random() < p) {
              if (Math.random() < P_FILL) {
                stroke(el);
              } else if (Math.random() < P_FILL_BLACK) {
                strokeAndFill(el, '#000');
              } else {
                strokeAndFill(el);
              }
            } else {
              el.attr({
                'fill-opacity': 0,
                'stroke-width': 0,
              });
            }
          });
        }
      );
    } else {
      const { rotation } = group.transform();
      const dRotation =
        Math.random() < P_50_PCT ? -ROTATION_ANGLE : ROTATION_ANGLE;
      group
        .animate(ANIMATION_TIME_MS, '-')
        .rotate(rotation + dRotation, HALF_DIAGONAL, HALF_DIAGONAL);
      setNewColorScheme();
    }
  };

  let interval;

  return {
    start: () => {
      makeNext();
      interval = setInterval(() => makeNext(), INTERVAL_TIME_MS);
    },
    stop: () => {
      allShapes.concat([group]).forEach(s => s.finish());
      allShapes.forEach(s => {
        s.attr({
          'fill-opacity': 0,
          'stroke-width': 0,
        });
      });
      if (interval) {
        clearInterval(interval);
      }
    },
  };
};

export default createVisualization;
