import React from 'react';
import Timer from './../Timer/Timer';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({
    item,
    status,
    handleChangeClock,
    handleClickStart,
    handleClickStop,
    handleClickComplete,
    handleClickActive,
    handleEditDescription,
    handleClickDelete
}) => {
    return (
        <li className="list-group-item">
            <Timer 
                {...item}
                status={status}
                handleChangeClock={handleChangeClock}
                handleClickStart={handleClickStart}
                handleClickStop={handleClickStop}
                handleClickComplete={handleClickComplete}
                handleClickActive={handleClickActive}
                handleEditDescription={handleEditDescription}
                handleClickDelete={handleClickDelete}
            />
        </li>
    );
});

export default SortableItem;