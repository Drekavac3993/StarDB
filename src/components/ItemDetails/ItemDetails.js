import React, { Component } from 'react';
import Spiner from '../Spiner';
import ErrorButton from '../ErrorButton';
import './ItemDetails.css';

const Record = ({ item, field, label }) => {
    return(
        <li className="list-group-item">
            <span className="term">{ label }</span>
            <span>{ item[field] }</span>
        </li>
    )
};

export {
    Record
}


export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null,
        loading: true
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;

        if (!itemId){
            return;
        }

        this.setState({
            loading: true
        });

        getData(itemId)
            .then((item) => {
                this.setState({
                    loading: false,
                    item,
                    image: getImageUrl(item)
                });
            });
    }

    render() {
        const { item, loading, image } = this.state;
        const { children } = this.props;

        const spinner = loading ? <Spiner /> : null;
        const content = !loading ? <ItemDetailsView itemDetails={ { image, item, children } }/> : null;

        return (
            <div className="item-details card">
                { spinner }
                { content }
            </div>
        )
    }
}

const ItemDetailsView = ({ itemDetails: { item, image, children } }) => {

    return(
        <React.Fragment>
            <img className="item-image"
                 src={ image }
                 alt={ item.name } />

            <div className="card-body">
                <h4>{ item.name }</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    )
};
