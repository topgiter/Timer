import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const propTypes = {
    show: PropTypes.bool.isRequired,
    description: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired
};

const defaultProps = {
    description: ''
};

class DescriptionModal extends Component {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            description: ''
        };

        // Binding
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleClickOk = this.handleClickOk.bind(this);
    }

    initiateDescription(description) {
        this.setState({
            description: description
        });
    }

    componentDidMount() {
        this.initiateDescription(this.props.description);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.show !== nextProps.show && nextProps.show === true) {
            // Initiate description when modal is reopend
            this.initiateDescription(this.props.description);
        }
    }
    
    handleChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleClickOk() {
        this.props.onChangeDescription(this.state.description);
        this.props.onHide();
    }

    // Render
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Timer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="description">
                        <ControlLabel>Timer's Description</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.description}
                            placeholder="Enter description"
                            onChange={this.handleChangeDescription}
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.handleClickOk}>
                        Ok
                    </Button>
                    <Button onClick={this.props.onHide}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

DescriptionModal.propTypes = propTypes;
DescriptionModal.defaultProps = defaultProps;

export default DescriptionModal;