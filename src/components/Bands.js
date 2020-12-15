// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export class Bands extends React.Component {
    constructor() {
        super()

        this.state = {
            jsonLoaded: false,
            bands: []
        }
    }

    async loadJSON() {
        try {
            await fetch('http://145.24.222.171:8000/api/bands', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        jsonLoaded: true,
                        bands: data.items,
                    })
                })
                .catch(err => console.error(err))
        } catch (err) {
            console.error(err)
        }
    }

    componentDidMount() {
        this.loadJSON()
    }

    componentDidUpdate() {
        this.loadJSON()
    }

    render() {
        const { jsonLoaded, bands} = this.state;

        if (!jsonLoaded) {
            return <h2 className="app container text-center">Loading bands...</h2>
        } else {
            let bandItems = bands.map(band => (
                <div key={band._id} className="card m-3">
                    <div className="card-header d-flex justify-content-around">
                        <h2>{band.name}</h2>
                    </div>
                    <div className="card-body">
                        <p>Hier komt extra info over band</p>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-primary">Edit Band</button>
                            <button className="btn btn-danger">Delete Band</button>
                        </div>
                    </div>
                </div>
            ))
            return (
                <div className="Bands mb-5">
                    <div>
                        <button type="submit" className="btn btn-primary">Create Band</button>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            {bandItems}
                        </div>
                    </div>
                </div>
            )
        }
    };
}