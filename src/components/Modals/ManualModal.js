import React, { Component, PropTypes } from 'react';
import { Modal, Button, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const propTypes = {
    timerId: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    description: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    handleAddManual: PropTypes.func.isRequired
};

const defaultProps = {
    description: ''
};

class ManualModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: 0,
            minutes: 0
        };

        // Binding
        this.handleChangeHours = this.handleChangeHours.bind(this);
        this.handleChangeMinutes = this.handleChangeMinutes.bind(this);
        this.handleClickOk = this.handleClickOk.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.show !== nextProps.show && nextProps.show === true) {
            // Initiate description when modal is reopend
            this.setState({
                hours: 0,
                minutes: 0
            });
        }
    }

    handleClickOk() {
        const milliseconds = (this.state.hours * 60 + this.state.minutes) * 60 * 1000;

        this.props.handleAddManual(this.props.timerId, milliseconds);
        this.props.onHide();
    }

    handleChangeHours(e) {
        this.setState({
            hours: parseInt(e.target.value, 10)
        });
    }

    handleChangeMinutes(e) {
        this.setState({
            minutes: parseInt(e.target.value, 10)
        })
    }

    // Render
    render() {
        let idx;

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Manual Time</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col>
                            <h3 className="text-center">{this.props.description}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <FormGroup controlId="formControlsSelectHours">
                                <ControlLabel>Hours</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="Hours"
                                    value={this.state.hours}
                                    onChange={this.handleChangeHours}
                                >
                                    {(() => {
                                        let hoursSelectNode = [];

                                        for (idx = 0; idx < 24; idx++) {
                                            hoursSelectNode.push(
                                                <option key={`hours-${idx}`} value={idx}>{idx}</option>
                                            );
                                        }

                                        return hoursSelectNode;
                                    })()}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup controlId="formControlsSelectMinutes">
                                <ControlLabel>Minutes</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="Minutes"
                                    value={this.state.minutes}
                                    onChange={this.handleChangeMinutes}
                                >
                                    {(() => {
                                        let minutesSelectNode = [];

                                        for (idx = 0; idx < 60; idx++) {
                                            minutesSelectNode.push(
                                                <option key={`minutes-${idx}`} value={idx}>{idx}</option>
                                            );
                                        }

                                        return minutesSelectNode;
                                    })()}
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
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

ManualModal.propTypes = propTypes;
ManualModal.defaultProps = defaultProps;

export default ManualModal;
