import React from 'react';
import { SwapiServiceConsumer } from "../SwapiServiceContext";

const WithSwapiSerwice = (Wrapped, mapMethodsToProps) => {
    return (props) => {
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService) => {
                        const serviceProps = mapMethodsToProps(swapiService);

                        return(
                            <Wrapped {...props} {...serviceProps} />
                        )
                    }
                }
            </SwapiServiceConsumer>
        )
    }
};

export default WithSwapiSerwice;
