import React, { Component } from 'react';
import TimerList from './components/DndList/TimerList';
import ManualModal from './components/Modals/ManualModal';
import { arrayMove } from 'react-sortable-hoc';
import { Grid, Row, Col, Button, FormControl, ButtonToolbar } from 'react-bootstrap';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            isPlayingId: -1,
            active: [
                {
                    id: 0,
                    description: 'React Job',
                    clock: 0,
                    isPlaying: false,
                },
                {
                    id: 1,
                    description: 'CI Job',
                    clock: 10000,
                    isPlaying: false,
                },
                {
                    id: 2,
                    description: 'Angular Job',
                    clock: 20000,
                    isPlaying: false,
                }
            ],
            completed: [],
            isShowManualModal: false,
            selectedTimer: undefined,
            editTimer: {
                id: undefined,
                description: '',
            }
        };

        // Binding
        this.handleChangeClock = this.handleChangeClock.bind(this);
        this.handleClickStart = this.handleClickStart.bind(this);
        this.handleClickStop = this.handleClickStop.bind(this);
        this.handleSortEnd = this.handleSortEnd.bind(this);
        this.handleClickComplete = this.handleClickComplete.bind(this);
        this.handleClickActive = this.handleClickActive.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickCreate =  this.handleClickCreate.bind(this);
        this.handleShowManualModal = this.handleShowManualModal.bind(this);
        this.handleAddManual = this.handleAddManual.bind(this);
    }

    handleChangeClock(id, clock) {
        this.setState(
            Object.assign({}, this.state, {
                active: this.state.active.map(item => {
                    if (item.id === id) {
                        item.clock = clock;
                    }

                    return item;
                })
            })
        );
    }

    handleClickStop(id) {
        if (id < 0) return;

        this.setState(
            Object.assign({}, this.state, {
                isPlayingId: -1,
                active: this.state.active.map(item => {
                    if (item.id === id) {
                        item.isPlaying = false;
                    }

                    return item;
                })
            })
        );
    }

    handleClickStart(id) {
        this.setState(
            Object.assign({}, this.state, {
                isPlayingId: id,
                active: this.state.active.map(item => {
                    if (item.id === id) {
                        item.isPlaying = true
                    }

                    if (item.id === this.state.isPlayingId) {
                        item.isPlaying = false
                    }

                    return item;
                })
            })
        );
    }

    handleClickComplete(id) {
        let completedItem = this.state.active.filter(item => item.id === id)[0];
        completedItem.isPlaying = false;

        this.setState(
            Object.assign({}, this.state, {
                isPlayingId: -1,
                active: this.state.active.filter(item => item.id !== id),
                completed: [completedItem, ...this.state.completed]
            })
        );
    }

    handleClickActive(id) {
        let activeItem = this.state.completed.filter(item => item.id === id)[0];

        this.setState(
            Object.assign({}, this.state, {
                active: [activeItem, ...this.state.active],
                completed: this.state.completed.filter(item => item.id !== id)
            })
        );
    }

    handleSortEnd(status, {oldIndex, newIndex}) {
        this.setState({
            [status]: arrayMove(this.state[status], oldIndex, newIndex)
        });
    }

    handleCloseModal(modalName) {
        this.setState({
            [`isShow${modalName}Modal`]: false
        });
    }

    handleOpenModal(modalName) {
        this.setState({
            [`isShow${modalName}Modal`]: true
        });
    }

    handleChangeDescription(e, timerId) {
        const description = e.target.value;

        // TODO timer ID should be sync with backend DB

        if (timerId === undefined) {    // If new timer
            // Change edit timer's state
            this.setState(
                Object.assign({}, this.state, {
                    editTimer: Object.assign({}, this.state.editTimer, {
                        description: description
                    })
                })
            );
        } else {    // If existing timer
            // Update description of timer
            this.setState({
                active: this.state.active.map(timer => {
                    if (timer.id === timerId) {
                        timer.description = description;
                    }

                    return timer;
                })
            });
        }
    }

    handleClickCreate() {
        // Generate a timer params
        const timerId = Date.now();

        const timer = {
            id: timerId,
            description: this.state.editTimer.description,
            clock: 0,
            isPlaying: false
        };

        this.setState({
            active: [timer, ...this.state.active],
            editTimer: Object.assign({}, this.state.editTimer, {
                description: ''
            })
        });
    }

    handleClickDelete(timerId) {
        this.setState({
            completed: this.state.completed.filter(timer => timer.id !== timerId)
        });
    }

    handleShowManualModal(timerId) {
        this.setState({
            selectedTimer: this.state.active.filter(timer => timer.id === timerId)[0],
            isShowManualModal: true
        });
    }

    handleAddManual(timerId, milliseconds) {
        this.setState({
            active: this.state.active.map(timer => {
                if (timer.id === timerId) {
                    timer.clock += milliseconds;
                }

                return timer;
            })
        });
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FormControl
                                type="text"
                                value={this.state.editTimer.description}
                                placeholder="Create a new timer here"
                                onChange={(e) => {this.handleChangeDescription(e)}}
                            />
                        </Col>
                        <Col xs={6} sm={5} className="text-right">
                            <ButtonToolbar style={{float: "right"}}>
                                <Button key={1} bsStyle="primary" onClick={this.handleClickCreate}>Create</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Grid>
                <TimerList
                    title="Active"
                    items={this.state.active}
                    handleChangeClock={this.handleChangeClock}
                    handleClickStart={this.handleClickStart}
                    handleClickStop={this.handleClickStop}
                    handleClickComplete={this.handleClickComplete}
                    handleChangeDescription={this.handleChangeDescription}
                    handleShowManualModal={this.handleShowManualModal}
                    onSortEnd={(e) => this.handleSortEnd('active', e)}
                />
                <TimerList
                    title="Completed"
                    items={this.state.completed}
                    handleClickActive={this.handleClickActive}
                    handleClickDelete={this.handleClickDelete}
                    handleChangeDescription={this.handleChangeDescription}
                    onSortEnd={(e) => this.handleSortEnd('completed', e)}
                />

                {this.state.selectedTimer !== undefined &&
                    <ManualModal
                        timerId={this.state.selectedTimer.id}
                        show={this.state.isShowManualModal}
                        description={this.state.selectedTimer.description}
                        onHide={(e) => this.handleCloseModal('Manual')}
                        handleAddManual={this.handleAddManual}
                    />
                }
{/*
                <DescriptionModal
                    show={this.state.isShowDescriptionModal}
                    onHide={(e) => this.handleCloseModal('Description')}
                    onChangeDescription={this.handleChangeDescription}
                />

                {this.state.editTimer && 
                    <DescriptionModal
                        timerId={this.state.editTimer.id}
                        description={this.state.editTimer.description}
                        show={this.state.isShowEditDescriptionModal}
                        onHide={(e) => this.handleCloseModal('EditDescription')}
                        onChangeDescription={this.handleChangeDescription}
                    />
                }
*/}
            </div>
        );
    }
}

export default App;
