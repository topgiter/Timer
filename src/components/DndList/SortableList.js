import React from 'react';
import { ListGroup } from 'react-bootstrap';
import SortableItem from './SortableItem';
import { SortableContainer } from 'react-sortable-hoc';

const SortableList = SortableContainer(({
    items,
    title,
    handleChangeClock,
    handleClickStart,
    handleClickStop,
    handleClickComplete,
    handleClickActive,
    handleChangeDescription,
    handleClickDelete,
    handleShowManualModal
}) => {
    return (
        <ListGroup componentClass="ul">
            {items.map((item, index) =>
                <SortableItem 
                    key={`item-${index}`}
                    index={index}
                    item={item}
                    title={title}
                    handleChangeClock={handleChangeClock}
                    handleClickStart={handleClickStart}
                    handleClickStop={handleClickStop}
                    handleClickComplete={handleClickComplete}
                    handleClickActive={handleClickActive}
                    handleChangeDescription={handleChangeDescription}
                    handleClickDelete={handleClickDelete}
                    handleShowManualModal={handleShowManualModal}
                />
            )}
        </ListGroup>
    );
});

export default SortableList;