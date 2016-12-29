import React, { Component, PropTypes } from 'react';
import SortableList from './SortableList';
import { Grid, Row, Col } from 'react-bootstrap';

const propTypes = {
    items: PropTypes.array.isRequired,
    handleChangeClock: PropTypes.func,
    handleClickStart: PropTypes.func,
    handleClickStop: PropTypes.func,
    handleClickComplete: PropTypes.func,
    handleClickActive: PropTypes.func,
    handleEditDescription: PropTypes.func,
    handleClickDelete: PropTypes.func,
    onSortEnd: PropTypes.func.isRequired,
    pressDelay: PropTypes.number,
    title: PropTypes.string
};

const defaultProps = {
    pressDelay: 0,
    title: ''
};

class TimerList extends Component {
    shouldCancelStart(e) {
        // Cancel sorting if the event target is an `input`, `textarea`, `select`, `option`, 'button' or 'a'
        if (['input', 'textarea', 'select', 'option', 'button', 'a'].indexOf(e.target.tagName.toLowerCase()) !== -1) {
            return true; // Return true to cancel sorting
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <h3 className="text-center">
                            {this.props.title}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SortableList
                            status={this.props.title === 'Active'}
                            items={this.props.items}
                            handleChangeClock={this.props.handleChangeClock}
                            handleClickStart={this.props.handleClickStart}
                            handleClickStop={this.props.handleClickStop}
                            handleClickComplete={this.props.handleClickComplete}
                            handleClickActive={this.props.handleClickActive}
                            handleEditDescription={this.props.handleEditDescription}
                            handleClickDelete={this.props.handleClickDelete}
                            onSortEnd={this.props.onSortEnd}
                            pressDelay={this.props.pressDelay}
                            shouldCancelStart={this.shouldCancelStart}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

TimerList.propTypes = propTypes;
TimerList.defaultProps = defaultProps;

export default TimerList;