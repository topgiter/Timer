import React from 'react';
import { ListGroup } from 'react-bootstrap';
import SortableItem from './SortableItem';
import { SortableContainer } from 'react-sortable-hoc';

const SortableList = SortableContainer(({
    items,
    status,
    handleChangeClock,
    handleClickStart,
    handleClickStop,
    handleClickComplete,
    handleClickActive
}) => {
    return (
        <ListGroup componentClass="ul">
            {items.map((item, index) =>
                <SortableItem 
                    key={`item-${index}`}
                    index={index}
                    item={item}
                    status={status}
                    handleChangeClock={handleChangeClock}
                    handleClickStart={handleClickStart}
                    handleClickStop={handleClickStop}
                    handleClickComplete={handleClickComplete}
                    handleClickActive={handleClickActive}
                />
            )}
        </ListGroup>
    );
});

export default SortableList;