import React, { Component } from 'react';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import PeoplePage from '../PeoplePage';
import ErrorButton from '../ErrorButton';
import ErrorIndicator from '../ErrorIndicator';
import './App.css';
import ItemList from "../ItemList";
import PersonDetails from "../PersonDetails";
import SwapiService from "../../services/SwapiService";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
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
            <div className="main-wrapper-app">
                <Header />
                { planet }
                <button className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <ErrorButton/>
                <PeoplePage />
                {/*<div className="row mb2">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemList onItemSelected={this.onPersonSelected}*/}
                {/*                  getData={this.swapiService.getAllPlanets}*/}
                {/*                  renderItem={(item) => item.name}/>*/}
                {/*    </div>*/}
                {/*    <div className="col-md-6">*/}
                {/*        <PersonDetails personId={this.state.selectedPerson}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="row mb2">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemList onItemSelected={this.onPersonSelected}*/}
                {/*                  getData={this.swapiService.getAllStarships}*/}
                {/*                  renderItem={(item) => (<span>{ item.name }<button>!</button></span>)}/>*/}
                {/*    </div>*/}
                {/*    <div className="col-md-6">*/}
                {/*        <PersonDetails personId={this.state.selectedPerson}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

        );
    }
}
