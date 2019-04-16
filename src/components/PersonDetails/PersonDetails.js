import React, { Component } from 'react';
import SwapiService from "../../services/SwapiService";
import Spiner from '../Spiner';
import ErrorButton from '../ErrorButton';
import './PersonDetails.css';


export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    onPersonDetailsLoaded = (person) => {
        this.setState({
            person,
            loading: false
        });
    };

    updatePerson() {
        const { personId } = this.props;

        if (!personId){
            return;
        }

        this.setState({
            loading: true
        });

        this.swapiService
            .getPerson(personId)
            .then(this.onPersonDetailsLoaded)
    }

    render() {
        const { person, loading } = this.state;

        const spinner = loading ? <Spiner /> : null;
        const content = !loading ? <PersonDetailsView personDetails={ person }/> : null;

        return (
            <div className="person-details card">
                { spinner }
                { content }
            </div>
        )
    }
}

const PersonDetailsView = ({ personDetails }) => {
    const { id, name, gender, birthYear, eyeColor } = personDetails;
    return(
        <React.Fragment>
            <img className="person-image"
                 src={ `https://starwars-visualguide.com/assets/img/characters/${ id }.jpg` }
                 alt={ name } />

            <div className="card-body">
                <h4>{ name }</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{ gender }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{ birthYear }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{ eyeColor }</span>
                    </li>
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    )
};
