import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import { PeoplePage, PlanetsPage, StarshipsPage, SecretPage, LoginPage } from '../Pages';
import { StarshipDetails } from '../SW-Components';
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
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    onServiceChange = () => {
      this.setState(({ swapiService }) => {
          const Service = swapiService instanceof SwapiService ?
                            DummySwapiService : SwapiService;
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
        this.setState({ hasError: true })
    }

    render() {
        const { isLoggedIn } = this.state;

        if (this.state.hasError){
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={ this.state.swapiService }>
                    <Router>
                        <div className="main-wrapper-app">
                            <Header onServiceChange={ this.onServiceChange }/>
                            { planet }
                            <button className="toggle-planet btn btn-warning btn-lg"
                                    onClick={this.toggleRandomPlanet}>
                                Toggle Random Planet
                            </button>
                            <Switch>
                                <Route path="/"
                                       render={() => <h2>Welcome to StarDB</h2>}
                                       exact/>

                                <Route path="/people/:id?" component={ PeoplePage }/>
                                <Route path="/planets" component={ PlanetsPage }/>

                                <Route path="/starships" exact component={ StarshipsPage }/>
                                <Route path="/starships/:id"
                                       render={({ match }) => {
                                           const { id } = match.params;
                                           return <StarshipDetails itemId={ id }/>
                                       }}/>

                                <Route path="/login" render={() => (
                                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>
                                    )}/>

                                <Route path="/secret" render={() => (
                                    <SecretPage isLoggedIn={isLoggedIn}/>
                                    )}/>

                                <Route render={() => <h2>Page not found</h2>}/>
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
