import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home'
import Navbar from './components/Navbar'

const Router = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar></Navbar>
        <Routes>
          <Route
            exact
            path='/'
            render={() => (
              <Home />
            )} />
        </Routes>
        <section>

        </section>
      </Fragment>
    </BrowserRouter>
  );
}
export default Router;