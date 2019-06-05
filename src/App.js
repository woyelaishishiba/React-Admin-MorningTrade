import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Loadable from 'react-loadable';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


function Loading(){
  return <div>Loading...</div>
}

//ADD BY ME
const ChooseHome = Loadable({
  loader: () => import('./pages/ChooseHome'),
  loading: Loading,
});

const MyFormik = Loadable({
  loader: () => import('./pages/MyFormik'),
  loading: Loading,
});

const Punch = Loadable({
  loader: () => import('./pages/Punch'),
  loading: Loading,
});

const FakePay = Loadable({
  loader: () => import('./pages/FakePay'),
  loading: Loading,
});

const Food = Loadable({
  loader: () => import('./pages/Food'),
  loading: Loading,
});

const FoodList = Loadable({
  loader: () => import('./pages/FoodTrade'),
  loading: Loading,
})

const AllFoodList = Loadable({
  loader: () => import('./pages/AllFood'),
  loading: Loading,
})

const EditChildMenu = Loadable({
  loader: () => import('./pages/AllFood/EditChildMenu'),
  loading: Loading,
})

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>

              {/* ADD BY ME */}
              <Route exact path='/choosehome' name='Choose Home' render={props => <ChooseHome {...props} />} />
              <Route exact path='/choosehome/formik' name='My Formik' render={props => <MyFormik {...props} />} />
              <Route exact path='/choosehome/punch' name='Punch' render={props => <Punch {...props} />} />
              <Route exact path='/choosehome/fakepay' name='Fake Pay' render={props => <FakePay {...props} />} />
              <Route exact path='/choosehome/food' name='Food' render={props => <Food {...props} />} />
              <Route exact path='/choosehome/foodinfolist' name='Food Info List' render={props => <FoodList {...props} />} />
              <Route exact path='/choosehome/allfoodlist' name='All Food List' render={props => <AllFoodList {...props} />} />
              <Route exact path="/choosehome/allfoodlist/editchildmenu/:id" name='Edit Child Menu' render={props => <EditChildMenu {...props} />} />
              <Route exact path="/choosehome/allfoodlist/editchildmenu/:id/:motherId" name='ADD Child Menu' render={props => <EditChildMenu {...props} />} />

              <Route path="/" name="choosehome"  render={props => <ChooseHome {...props} />} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
