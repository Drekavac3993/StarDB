import React, { Component } from 'react';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../Pages';
import ErrorIndicator from '../ErrorIndicator';
import ErrorBoundry from "../ErrorBoundry";
import SwapiService from "../../services/SwapiService";
import DummySwapiService from '../../services/DummySwapiService';
import { SwapiServiceProvider } from '../SwapiServiceContext';
import './App.css';

export default class App extends Component {

    state = {
        hasError: false,
        showRandomPlanet: true,
        swapiService: new SwapiService(),
    };

    onServiceChange = () => {
      this.setState(({ swapiService }) => {
          const Service = swapiService instanceof SwapiService ?
                            DummySwapiService : SwapiService;
          console.log('Switched to', Service.name);

          return {
              swapiService: new Service()
          };
      })
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch() {
        console.log('componentDidCatch');
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError){
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={ this.state.swapiService }>
                <div className="main-wrapper-app">
                    <Header onServiceChange={ this.onServiceChange }/>
                    { planet }
                    <button className="toggle-planet btn btn-warning btn-lg"
                            onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <PeoplePage />
                    <PlanetsPage />
                    <StarshipsPage />
                </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
