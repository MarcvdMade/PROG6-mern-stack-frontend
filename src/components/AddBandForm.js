import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class AddBandForm extends React.Component {
    constructor() {
        super()

        this.state = {
            showCreateModal: false,
            name: "",
            rating: "",
            mainGenre: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.addBand = this.addBand.bind(this)
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
    
    render() {

        return(
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
        )    
    }
}