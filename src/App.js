import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.js'
import RegisterPage from './pages/register/register';
// import { auth, createUserProfileDoc, addCollectionAndDocuments } from './firebase/firebase.utils';
// import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import { checkUserSession } from './redux/user/user.action';
class App extends React.Component {
  unSubscribeFromAuth = null

  componentDidMount() {
    // const { setCurrentUser, collectionsArray } = this.props;

    // observer pattern
    // this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // userAuth would be null if no user isLoggedIn
      // if (userAuth) {
      //   const userRef = await createUserProfileDoc(userAuth);

      //   userRef.onSnapshot(snapShot => {
      //       setCurrentUser({
      //         id: snapShot.id,
      //         ...snapShot.data()
      //     })
      //   });

      // } 
      // else {
        //   setCurrentUser(userAuth)
        // }
        
        // setCurrentUser(userAuth)
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items})))
    // })
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return ( 
      <div>
        <Header />
        <Switch>
          <Route exact path={'/'} component={HomePage} />
          <Route path={'/shop'} component={ShopPage} />
          <Route exact path={'/checkout'} component={CheckoutPage} />
          <Route 
            exact 
            path={'/signin'} 
            render={() => 
            this.props.user ? (
            <Redirect to='/' />
            ): (<RegisterPage />)
          } 
        />
        </Switch>
      </div>
    ); 
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
