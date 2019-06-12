import { connect } from 'react-redux';
import FavoriteButton from '@components/shared/favorite-button';
import addFavorite from '@store/actions/creators/add-favorite.creator';
import removeFavorite from '@store/actions/creators/remove-favorite.creator';

const mapStateToProps = ({ favorites }) => ({ favorites });

export default connect(
  mapStateToProps,
  { addFavorite, removeFavorite }
)(FavoriteButton);
