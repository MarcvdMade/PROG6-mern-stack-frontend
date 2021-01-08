import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class Bands extends React.Component {
    constructor() {
        super()

        this.state = {
            jsonLoaded: false,
            bands: [],
            showCreateModal: false,
            name: "",
            rating: "",
            mainGenre: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.addBand = this.addBand.bind(this)
    }

    async loadJSON() {
        try {
            let response = await fetch('http://145.24.222.171:8000/api/bands', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })

            let json = await response.json()

            json.items.map(band => (
                band.hidden = true
            ))         

            console.log(json)

            this.setState({
                jsonLoaded: true,
                bands: json.items
            })
        } catch (err) {
            console.error(err)
        }
    }

    handleCreateModal() {
        this.setState({
            showCreateModal: !this.state.showCreateModal
        })
    }

    handleInputChange(e) {

        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    async addBand() {
        let values = {
            name: this.state.name,
            rating: this.state.rating,
            mainGenre: this.state.mainGenre
        }

        try {
            await fetch('http://145.24.222.171:8000/api/bands', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            alert("Added a new band")
            this.loadJSON()
        } catch(err) {
            console.error(err)
        }
    }
    

    async deleteBand(id) {
        try {
            await fetch('http://145.24.222.171:8000/api/bands/' + id, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            })
            alert("Deleted a band")
            this.loadJSON()
        } catch (err) {
            console.error(err)
        }
    }

    componentDidMount() {
        this.loadJSON()
    }

    render() {
        const { jsonLoaded, bands } = this.state;

        if (!jsonLoaded) {
            return <h2 className="app container text-center">Loading bands...</h2>
        } else {
            let bandItems = bands.map(band => (
                <div key={band._id} className="card m-3">
                    <div className="card-header d-flex justify-content-around">
                        <h2>{band.name}</h2>
                        <button className="btn"><FontAwesomeIcon icon={faSortDown} color="black" /></button>
                    </div>

                    <div style={{display: (band.hidden ? 'none' : 'block')}} className="card-body">
                        <p>Rating: {band.rating}</p>
                        <p>Genre: {band.mainGenre}</p>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-primary m-2">Edit Band</button>
                            <button onClick={() => this.deleteBand(band._id)} className="btn btn-danger m-2">Delete Band</button>
                        </div>
                    </div>

                </div>
            ))
            return (
                <div className="Bands mb-5">
                    <div>
                        <h2>Amount of rated bands: {this.state.bands.length}</h2>
                        <Button onClick={() => this.handleCreateModal()}>Add new band</Button>

                        <Modal
                            show={this.state.showCreateModal}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header>
                                <Modal.Title>Add a new band</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={(e) => {
                                    e.preventDefault()
                                    this.addBand()

                                    this.setState({
                                        name: '',
                                        rating: '',
                                        mainGenre: ''
                                    })

                                    this.handleCreateModal()
                                }}>
                                    <Form.Group>
                                        <Form.Label>Band</Form.Label>
                                        <Form.Control name="name" onChange={this.handleInputChange} value={this.state.name} type="text" required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control name="rating" onChange={this.handleInputChange} value={this.state.rating} type="number" min="1" max="10" required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Main Genre</Form.Label>
                                        <Form.Control name="mainGenre" onChange={this.handleInputChange} value={this.state.mainGenre} type="text" required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Band
                                    </Button>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.handleCreateModal()}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>

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