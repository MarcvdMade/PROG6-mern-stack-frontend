import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

export class Intro extends React.Component {
    render() {
        return (
        <div className="Intro">
            <div className="container">
                <h1>Marc's MERN stack bands app <FontAwesomeIcon icon={faHeadphones} /></h1>
                <p>
                    This is my MERN stack project for school! I'm making a RESTful app. using an API
                    i made myself.
                </p>
            </div>
        </div>
    )};
}