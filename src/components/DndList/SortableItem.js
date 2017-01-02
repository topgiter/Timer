import React from 'react';
import Timer from './../Timer/Timer';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({
    item,
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
        <li className="list-group-item">
            <Timer 
                {...item}
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
        </li>
    );
});

export default SortableItem;