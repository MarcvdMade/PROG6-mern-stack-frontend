import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

export class Bands extends React.Component {
    constructor() {
        super()

        this.state = {
            jsonLoaded: false,
            bands: [],
            pagination: [],
            showCreateModal: false,
            showEditModal: false,
            name: "",
            rating: "",
            mainGenre: "",
            editBand: [],
            editName: "",
            editRating: "",
            editMainGenre: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
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

            // json.items.map(band => (
            //     band.hidden = true
            // ))         

            console.log(json)

            this.setState({
                jsonLoaded: true,
                bands: json.items,
                pagination: json.pagination
            })
        } catch (err) {
            console.error(err)
        }
    }

    handleShowDetail(e) {
        console.log(e.target)
        let t = e.target
        let div = t.parentElement.parentElement.children
        console.log(div[1])

        if (div[1].classList.contains("card-show")) {
            t.innerHTML = "Show Details"
            div[1].classList.remove("card-show")
            div[1].classList.add("card-hidden")
        } else {
            t.innerHTML = "Hide Details"
            div[1].classList.add("card-show")
            div[1].classList.remove("card-hidden")
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

    async editBand() {
        let values = {
            name: this.state.editName,
            rating: this.state.editRating,
            mainGenre: this.state.editMainGenre
        }

        try {
            await fetch(this.state.editBand._links.self.href, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            alert("Edited Band")
            this.loadJSON()
        } catch (err) {
            console.error(err)
        }
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
        } catch (err) {
            console.error(err)
        }
    }

    handleEditModal(band) {
        this.setState({
            editBand: band,
            editName: band.name,
            editRating: band.rating,
            editMainGenre: band.mainGenre,
            showEditModal: !this.state.showEditModal
        })
    }

    async deleteBand(uri) {
        try {
            await fetch(uri, {
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
                    <div className="card-header d-flex flex-column justify-content-around">
                        <h2>{band.name}</h2>
                        <button onClick={this.handleShowDetail} className="btn">Show Details</button>
                    </div>

                    <div className="card-body card-hidden">
                        <p>Rating: {band.rating}</p>
                        <p>Genre: {band.mainGenre}</p>
                        <div className="d-flex justify-content-around">
                            <button onClick={() => this.handleEditModal(band)} className="btn btn-primary m-2">Edit Band</button>
                            <button onClick={() => this.deleteBand(band._links.self.href)} className="btn btn-danger m-2">Delete Band</button>
                        </div>
                    </div>

                </div>
            ))
            return (
                <div className="Bands mb-5">
                    <div>
                        <h2>Amount of rated bands/artist: {this.state.bands.length}</h2>
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
                                        <Form.Label>Rating: {this.state.rating}</Form.Label>
                                        <Form.Control name="rating" onChange={this.handleInputChange} value={this.state.rating} type="range" min="1" max="10" required />
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

                        <Modal
                            show={this.state.showEditModal}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header>
                                <Modal.Title>Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={(e) => {
                                    e.preventDefault()
                                    this.editBand()

                                    this.setState({
                                        editBand: [],
                                        editName: "",
                                        editRating: "",
                                        editMainGenre: "",
                                        showEditModal: !this.state.showEditModal
                                    })
                                }}>
                                    <Form.Group>
                                        <Form.Label>Edit {this.state.editName}</Form.Label>
                                        <Form.Control name="editName" onChange={this.handleInputChange} value={this.state.editName} type="text" required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Rating: {this.state.editRating}</Form.Label>
                                        <Form.Control name="editRating" onChange={this.handleInputChange} value={this.state.editRating} type="range" min="1" max="10" required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Main Genre</Form.Label>
                                        <Form.Control name="editMainGenre" onChange={this.handleInputChange} value={this.state.editMainGenre} type="text" required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Edit band
                                    </Button>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => {
                                    this.setState({
                                        editBand: [],
                                        editName: "",
                                        editRating: "",
                                        editMainGenre: "",
                                        showEditModal: !this.state.showEditModal
                                    })
                                }}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                    <div className="d-flex flex-column">
                        {bandItems}
                    </div>
                </div>
            )
        }
    };
}