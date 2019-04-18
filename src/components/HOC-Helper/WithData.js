import React, { Component } from 'react'
import Spiner from "../Spiner";

const WithData = (View) => {
    return class extends Component {

        state = {
            data: null
        };

        componentDidMount() {
            this.update();
        }

        componentDidUpdate(prevProps) {
            if (this.props.getData !== prevProps.getData){
                this.update();
            }
        }

        update(){
            this.props.getData()
                .then((data) => {
                    this.setState({ data });
                })
        }

        render() {
            const { data } = this.state;

            if(!data){
                return <Spiner/>
            }

            return <View {...this.props } data={ data } />;
        }
    };
};

export default WithData;
