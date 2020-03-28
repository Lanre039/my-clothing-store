import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true
    }
  }
  unSubscribeFromSnapShot = null;

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections');

    // Observer pattern
    // this.unSubscribeFromSnapShot = collectionRef.onSnapshot(async snapShot => {
    //  const collectionsMap = convertCollectionSnapshotToMap(snapShot)
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    collectionRef.get().then(snapShot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapShot)
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
      <Route 
        exact 
        path={`${match.path}`} 
        render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />}
      />
      <Route 
        exact 
        path={`${match.path}/:collectionId`} 
        render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> } 
      />
      {/* <Route exact path={`${match.path}`} component={CollectionOverview}/>
      <Route exact path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);