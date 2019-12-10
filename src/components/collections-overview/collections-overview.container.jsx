import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
  // withSpinner which wraps around the CollectionOverview expects isLoading property
  isLoading: selectIsCollectionFetching
});

//const CollectionsOverviewContainer = connect(mapStateTorProps)(WithSpinner(CollectionsOverview));
// the above is the same as:
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
