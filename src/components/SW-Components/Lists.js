import React from 'react';
import ItemList from '../ItemList';
import { WithData, WithSwapiService } from '../HOC-Helper';

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

const renderName = ({ name }) => <span>{ name }</span>;
const renderModelAndName = ({ model, name }) => <span>{ name } ({ model })</span>;

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
};

const PersonList = WithSwapiService(
                        WithData(withChildFunction(ItemList, renderName)),
                    mapPersonMethodsToProps);

const PlanetList = WithSwapiService(
                        WithData(withChildFunction(ItemList, renderName)),
                    mapPlanetMethodsToProps);

const StarshipList = WithSwapiService(
                        WithData(withChildFunction(ItemList, renderModelAndName)),
                    mapStarshipMethodsToProps);

export {
    PersonList,
    PlanetList,
    StarshipList
}
