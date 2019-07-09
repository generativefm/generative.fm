import Tone from 'tone';
import sampleFormat from '@config/sample-format';
import sampleSource from '@config/sample-source';
import markPieceBuildLoading from '../../actions/creators/mark-piece-build-loading.creator';
import markPieceBuildLoaded from '../../actions/creators/mark-piece-build-loaded.creator';
import performance from './performance';
import stopPerformances from './stop-performances';
import castApplicationId from '@config/cast-application-id';

let lastBuildId;
let isPerformanceBuilding = false;
let queuedPiece = null;

const streamDestination = Tone.context.createMediaStreamDestination();

const audioTracks = streamDestination.stream.getAudioTracks();

window['__onGCastApiAvailable'] = isAvailable => {
  if (isAvailable) {
    const { cast } = window;
    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions({
      receiverApplicationId: castApplicationId,
      autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });

    castContext.addEventListener(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      ({ castState }) => {
        if (castState === cast.framework.CastState.CONNECTED) {
          const pc = new RTCPeerConnection(null);

          const castSession = castContext.getCurrentSession();
          castSession.addMessageListener(
            'urn:x-cast:fm.generative',
            (ns, message) => {
              const data = JSON.parse(message);
              if (data !== null) {
                if (data.type === 'answer') {
                  console.log('answer received');
                  pc.setRemoteDescription(data);
                } else {
                  console.log('ice candidate received');
                  pc.addIceCandidate(data);
                }
              }
            }
          );

          pc.onicecandidate = ({ candidate }) =>
            castSession.sendMessage(
              'urn:x-cast:fm.generative',
              JSON.stringify(candidate),
              () => {
                console.log('candidate sent');
              },
              () => {
                console.log('candidate failed to send');
              }
            );

          pc.onnegotiationneeded = () => {
            pc.createOffer().then(offer => {
              pc.setLocalDescription(offer).then(() => {
                console.log('sending offer');
                castSession.sendMessage(
                  'urn:x-cast:fm.generative',
                  JSON.stringify(offer),
                  () => {
                    console.log('offer sent');
                  },
                  () => {
                    console.log('offer failed to send');
                  }
                );
              });
            });
          };

          audioTracks.forEach(track => {
            pc.addTrack(track, streamDestination.stream);
          });
        }
      }
    );
  }
};

// ws.addEventListener('message', event => {
//   const data = JSON.parse(event.data);
//   if (data !== null) {
//     if (data.type === 'answer') {
//       console.log('answer received');
//       pc.setRemoteDescription(data).then(() => {});
//     } else {
//       console.log('ice candidate received');
//       pc.addIceCandidate(data);
//     }
//   }
// });

const makePlayPiece = (store, performances) => {
  const playPiece = piece => {
    if (!isPerformanceBuilding) {
      queuedPiece = null;
      isPerformanceBuilding = true;
      const pieceVol = new Tone.Volume().toMaster();
      pieceVol.connect(streamDestination);
      const piecePerformance = performance(piece, pieceVol);
      performances.push(piecePerformance);
      lastBuildId = piecePerformance.performanceId;
      store.dispatch(markPieceBuildLoading(piecePerformance.performanceId));

      // METERING
      // most pieces between 0.1 and 0.3
      // const meter = new Tone.Meter();
      // pieceVol.connect(meter);
      // let maxDb = -Infinity;
      // const updateMaxDb = () => {
      //   const db = meter.getValue();
      //   if (db > maxDb) {
      //     maxDb = db;
      //   }
      // };
      // setInterval(() => {
      //   updateMaxDb();
      // }, 0);
      // setInterval(() => {
      //   console.log(maxDb);
      // }, 1000);

      piece
        .makePiece({
          destination: pieceVol,
          audioContext: Tone.context,
          preferredFormat: sampleFormat,
          sampleSource,
        })
        .then(cleanUp => {
          piecePerformance.addCleanupFn(cleanUp);
          piecePerformance.isLoaded = true;
          isPerformanceBuilding = false;
          const { selectedPieceId, isPlaying } = store.getState();
          store.dispatch(markPieceBuildLoaded(piecePerformance));
          if (
            lastBuildId === piecePerformance.performanceId &&
            selectedPieceId === piece.id &&
            isPlaying
          ) {
            Tone.Transport.start();
          } else {
            stopPerformances(performances);
          }
          if (isPlaying && queuedPiece !== null) {
            playPiece(queuedPiece, store);
          }
        });
    } else {
      queuedPiece = piece;
    }
  };
  return playPiece;
};

export default makePlayPiece;
