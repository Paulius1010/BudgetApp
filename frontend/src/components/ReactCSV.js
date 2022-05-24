import React from 'react';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ReactCSV = () => {

    const data = [
        ["Aprašymas", "Data", "Kategorija", "Kiekis"],
        // [expense.expenseName, expense.date, expense.expensesCategory.name, expense.amount]
        ["1", "1", "1", "1"]
    ];



    return (
        <div>
            <CSVLink
                data={data}
                filename={"Išlaidos"}
                target="_blank"
                style={{ color: "white" }}
            >
                Atsisiųsti išlaidas <FontAwesomeIcon icon="download" style={{ paddingBottom: 2.5 }} />
            </CSVLink>
        </div>
    )
};

export default ReactCSV;