import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

const DELAY = 100;   // milliseconds to tick

const propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    clock: PropTypes.number,
    isPlaying: PropTypes.bool,
    status: PropTypes.bool,
    handleClickStart: PropTypes.func,
    handleClickStop: PropTypes.func,
    handleClickComplete: PropTypes.func,
    handleEditDescription: PropTypes.func,
    handleClickDelete: PropTypes.func
};

const defaultProps = {
    description: '',
    clock: 0
};

class Timer extends Component {
    interval = 0;
    previousTickTime;

    constructor(props) {
        super(props);

        // Binding
        this.handleClickStop = this.handleClickStop.bind(this);
        this.handleClickStart = this.handleClickStart.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentWillUnmount() {
        if (this.interval !== 0) {
            clearInterval(this.interval);
            this.interval = 0;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isPlaying !== nextProps.isPlaying) {
            if (nextProps.isPlaying === true) {
                // Start to play
                if (this.interval !== 0) {
                    clearInterval(this.interval);
                    this.interval = 0;
                }

                this.previousTickTime = Date.now();
                this.interval = setInterval(this.tick, DELAY);
            } else {
                // Stop to play
                if (this.interval !== 0) {
                    clearInterval(this.interval);
                    this.interval = 0;
                }
            }
        }
    }
    
    /**
     * Handlers
     */

    handleClickStart(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.handleClickStart(this.props.id);
    }

    handleClickStop(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.handleClickStop(this.props.id);
    }

    tick() {
        let now = Date.now();
        let clock = this.props.clock + (now - this.previousTickTime);
        this.previousTickTime = now;

        this.props.handleChangeClock(this.props.id, clock);
    }

    SecondsTohhmmss(milliseconds) {
        let totalSeconds = Math.floor(milliseconds / 1000);
        let hours   = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

        // round seconds
        seconds = Math.round(seconds * 100) / 100

        let result = (hours < 10 ? "0" + hours : hours);
            result += ":" + (minutes < 10 ? "0" + minutes : minutes);
            result += ":" + (seconds  < 10 ? "0" + seconds : seconds);

        return result;
    }

    // Render
    render() {
        return (
            <Row>
                <Col xs={12} sm={6}>
                    <p>{this.props.description}</p>
                </Col>

                <Col xs={6} sm={5} className="text-right">
                    <ButtonToolbar style={{float: "right"}}>
                        {(() => {
                            let buttonGroups = [];

                            if (this.props.status === true) {
                                if (this.props.isPlaying === true) {
                                    buttonGroups.push(
                                        <Button
                                            key={1}
                                            bsStyle="info"
                                            onClick={(e) => this.handleClickStop(e)}
                                            onMouseDown={(e) => {e.stopPropagation()}}
                                        >
                                            Stop
                                        </Button>
                                    );
                                } else {
                                    buttonGroups.push(
                                        <Button key={1} bsStyle="primary" onClick={(e) => this.handleClickStart(e)}>Start</Button>
                                    );
                                }

                                buttonGroups.push(
                                    <DropdownButton
                                        key={2}
                                        id="active-action-dropdown"
                                        title="Actions"
                                    >
                                        <MenuItem onClick={(e) => this.props.handleEditDescription(this.props.id)}>
                                            Edit description
                                        </MenuItem>
                                        <MenuItem onClick={(e) => this.props.handleClickComplete(this.props.id)}>
                                            Mark as Completed
                                        </MenuItem>
                                        <MenuItem onClick={(e) => {}}>
                                            Add Manual time
                                        </MenuItem>
                                    </DropdownButton>
                                );
                            } else {
                                buttonGroups.push(
                                    <DropdownButton
                                        key={1}
                                        id="completed-action-dropdown"
                                        title="Actions"
                                    >
                                        <MenuItem onClick={(e) => this.props.handleClickActive(this.props.id)}>
                                            Mark as Active
                                        </MenuItem>
                                        <MenuItem onClick={(e) => this.props.handleClickDelete(this.props.id)}>
                                            Delete timer
                                        </MenuItem>
                                    </DropdownButton>
                                );
                            }

                            return buttonGroups;
                        })()}
                    </ButtonToolbar>
                </Col>

                <Col xs={6} sm={1} className="text-right">
                    <p>{this.SecondsTohhmmss(this.props.clock)}</p>
                </Col>
            </Row>
        );
    }
}

Timer.PropTypes = propTypes;
Timer.defaultProps = defaultProps;

export default Timer;