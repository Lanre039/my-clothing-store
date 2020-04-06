import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import CollectionOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';
// import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
// import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

import CollectionContainer from '../collection/collection.container';

// const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  
  unSubscribeFromSnapShot = null;

  componentDidMount() {
    
    // const collectionRef = firestore.collection('collections');

    // Observer pattern
    // this.unSubscribeFromSnapShot = collectionRef.onSnapshot(async snapShot => {
    //  const collectionsMap = convertCollectionSnapshotToMap(snapShot)
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    // collectionRef.get().then(snapShot => {
    //   const collectionsMap = convertCollectionSnapshotToMap(snapShot)
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  render() {
    // const { match, isCollectionFetching, selectIsCollectionLoaded } = this.props;
    const { match } = this.props;
    
    return (
      <div className='shop-page'>
      <Route 
        exact 
        path={`${match.path}`} 
        component={CollectionsOverviewContainer}
      />
      {/* <Route 
        exact 
        path={`${match.path}`} 
        render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
      /> */}
      {/* <Route 
        exact 
        path={`${match.path}/:collectionId`} 
        render={(props) => <CollectionPageWithSpinner isLoading={!selectIsCollectionLoaded} {...props} /> } 
      /> */}
      <Route 
        exact 
        path={`${match.path}/:collectionId`} 
        component={CollectionContainer}
      />
      {/* <Route exact path={`${match.path}`} component={CollectionOverview}/>
      <Route exact path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
    </div>
    )
  }
}
// const mapStateToProps = createStructuredSelector({
//   selectIsCollectionLoaded: selectIsCollectionLoaded
// });

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);