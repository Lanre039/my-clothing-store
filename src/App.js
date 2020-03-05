import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import RegisterPage from './pages/register/register';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';

class App extends React.Component {
  unSubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // userAuth would be null if no user isLoggedIn
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        });
        
      } else {
        setCurrentUser(userAuth)
      }
      

      
      
    })
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
          <Route path={'/signin'} component={RegisterPage} />
        </Switch>
      </div>
    ); 
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
