import React, { Component } from 'react';
import TimerList from './components/DndList/TimerList';
import { arrayMove } from 'react-sortable-hoc';

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
            completed: []
        };

        // Binding
        this.handleChangeClock = this.handleChangeClock.bind(this);
        this.handleClickStart = this.handleClickStart.bind(this);
        this.handleClickStop = this.handleClickStop.bind(this);
        this.handleSortEnd = this.handleSortEnd.bind(this);
        this.handleClickComplete = this.handleClickComplete.bind(this);
        this.handleClickActive = this.handleClickActive.bind(this);
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

    render() {
        return (
            <div className="App">
                <TimerList
                    title="Active"
                    items={this.state.active}
                    handleChangeClock={this.handleChangeClock}
                    handleClickStart={this.handleClickStart}
                    handleClickStop={this.handleClickStop}
                    handleClickComplete={this.handleClickComplete}
                    onSortEnd={(e) => this.handleSortEnd('active', e)}
                />
                <TimerList
                    title="Completed"
                    items={this.state.completed}
                    handleClickActive={this.handleClickActive}
                    onSortEnd={(e) => this.handleSortEnd('completed', e)}
                />
            </div>
        );
    }
}

export default App;
