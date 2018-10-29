import { connect } from 'react-redux';
import VisualizerComponent from '../components/app/controls/currently-playing/visualizer';

const mapStateToProps = ({ isPlaying }) => ({ isPlaying });

export default connect(mapStateToProps)(VisualizerComponent);
