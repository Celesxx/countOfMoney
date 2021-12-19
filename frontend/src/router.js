import { Fragment, useState } from 'react';
import { React } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home'
import Navbar from './components/Navbar'
import RegisterModal from './components/Register'
import LoginModal from './components/Login'

const Router = () => {
  const [modalRegisterIsOpen, setRegisterIsOpen] = useState(true);
  const [modalLoginIsOpen, setLoginIsOpen] = useState(false);


  return (
    <BrowserRouter>
      <Fragment>
        <Navbar></Navbar>
        <Route
          exact
          path='/'
          render={() => (
            <Home />
          )} />
        <section>
          <Route
            exact
            path='/login'
            render={() => (
              <div>
                {setLoginIsOpen && (
                  <LoginModal setLoginIsOpen={setLoginIsOpen} modalLoginIsOpen={modalLoginIsOpen} setRegisterIsOpen={setRegisterIsOpen} />
                )}
              </div>
            )}
            />
          <Route
            exact
            path='/register'
            render={() => (
              <div>{setRegisterIsOpen && (
                <RegisterModal setRegisterIsOpen={setRegisterIsOpen} modalRegisterIsOpen={modalRegisterIsOpen} setLoginIsOpen={setLoginIsOpen} />
              )}
              </div>)}
          />
        </section>
      </Fragment>
    </BrowserRouter>
  );
}
export default Router;