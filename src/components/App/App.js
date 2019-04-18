import React, { Component } from 'react';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import PeoplePage from '../PeoplePage';
import ErrorButton from '../ErrorButton';
import ErrorIndicator from '../ErrorIndicator';
import './App.css';
import ItemList from "../ItemList";
import ItemDetails, { Record } from "../ItemDetails";
import SwapiService from "../../services/SwapiService";
import ErrorBoundry from "../ErrorBoundry";
import Row  from '../Row';
import DummySwapiService from '../../services/DummySwapiService';

import { SwapiServiceProvider } from '../SwapiServiceContext';

import {
    PersonList,
    PlanetList,
    StarshipList,
    PersonDetails,
    PlanetDetails,
    StarshipDetails
} from '../SW-Components';


export default class App extends Component {

    state = {
        showRandomPlanet: true,
        hasError: false,
        swapiService: new DummySwapiService(),
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
                    {/*{ planet }*/}
                    {/*<button className="toggle-planet btn btn-warning btn-lg"*/}
                    {/*        onClick={this.toggleRandomPlanet}>*/}
                    {/*    Toggle Random Planet*/}
                    {/*</button>*/}
                    {/*<ErrorButton/>*/}
                    {/*<Row left={ personDetails } right={ starshipDetails }/>*/}
                    {/*<PeoplePage />*/}

                    <PersonDetails itemId={11}/>

                    <PlanetDetails itemId={5}/>

                    <StarshipDetails itemId={9}/>

                    <PersonList />

                    <PlanetList />

                    <StarshipList />




                    {/*<div className="row mb2">*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <ItemList onItemSelected={this.onPersonSelected}*/}
                    {/*                  getData={this.swapiService.getAllStarships}*/}
                    {/*                  renderLabel={(item) => (<span>{ item.name }<button>!</button></span>)}/>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <ItemDetails itemId={this.state.selectedPerson}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
