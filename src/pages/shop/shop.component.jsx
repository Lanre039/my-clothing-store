import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

import CollectionContainer from '../collection/collection.container';
const ShopPage = ({ fetchCollectionStartAsync, match }) => {

  useEffect(() => {
    fetchCollectionStartAsync();
  }, [fetchCollectionStartAsync]);
    
  return (
    <div className='shop-page'>
    <Route 
      exact 
      path={`${match.path}`} 
      component={CollectionsOverviewContainer}
    />
    <Route 
      exact 
      path={`${match.path}/:collectionId`} 
      component={CollectionContainer}
    />
  </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);