import React, { Component } from 'react';
import './PeoplePage.css';
import ItemList from "../ItemList";
import ItemDetails from "../ItemDetails";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";
import Row from '../Row';
import ErrorBoundry from "../ErrorBoundry";

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 11
    };

    onPersonSelected = (id) => {
        this.setState({ selectedPerson: id })
    };

    render() {
        if (this.state.hasError){
            return <ErrorIndicator/>
        }

        const itemList =  (<ItemList onItemSelected={this.onPersonSelected}
                                    getData={this.swapiService.getAllPeople}>{
                                        (i) => (`${i.name} (${i.birthYear})`)
                                    }</ItemList>);

        const itemDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
            <Row left={ itemList } right={ itemDetails }/>
        );
    }
}
