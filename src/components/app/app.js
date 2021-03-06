import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

// import ErrorIndicator from '../error-indicator';
// import Row from '../row';

// import {
//   PersonDetails,
//   PlanetDetails,
//   StarshipDetails,

//   PersonList,
//   PlanetList,
//   StarshipList
// } from '../sw-components';

import { 
  PeoplePage,
  PlanetsPage,
  StarshipsPage } from '../pages';

import './app.css';


export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  // componentDidCatch() {
  //   this.setState({ hasError: true });
  // }

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <div className="stardb-app">
            <Header  onServiceChange={this.onServiceChange}/>
            <RandomPlanet />
            <PeoplePage />
            <PlanetsPage />
            <StarshipsPage />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>

    );
  }
}
