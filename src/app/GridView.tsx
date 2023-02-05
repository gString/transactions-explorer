import {useEffect, useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {ICellRendererParams} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "./ag-explorer.css";
import {getEtherscanTransactions, Transaction} from "./EtherscanUtils";
import icon from "./icon.png";

const GridView = ({address}: { address: string }) => {
    const [rowData, setRowData] = useState<Transaction[]>([]);
    const [columnDefs,] = useState([
        {
            field: "date",
            cellStyle: {color: "#44607f"},
            width: 250,
            cellClass: "lineHeight",
        },
        {
            field: "from",
            width: 250,
            cellClass: "lineHeight extraPadding",
        },
        {
            field: "to",
            width: 250,
            cellClass: "lineHeight extraPadding",
        },
        {
            field: "value",
            cellClass: "lineHeight valueCell",
            cellRenderer: (params: ICellRendererParams) => {
                return <div><img src={icon} alt="Icon"/>{params.value}<span>ETH</span></div>
            },
            width: 210,
        },
        {
            field: "confirmation",
            width: 190,
            cellClass: "lineHeight",
        },
        {
            field: "hash",
            cellStyle: {color: "#8c8c8c"},
            suppressSizeToFit: false,
            maxWidth: 150,
            cellClass: "lineHeight lessPadding",
        },
    ]);

    useEffect(() => {
        const getTransactions = async () => {
            const transactions = await getEtherscanTransactions(address);
            setRowData(transactions);
        }
        getTransactions();
    }, [address]);

    useEffect(() => {
        console.log("rowData", rowData);
    }, [rowData]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        suppressSizeToFit: true,
        tooltipShowDelay: 0,
        tooltipHideDelay: 3000,
        enableBrowserTooltips: true
    }), []);

    const rowHeight = 40;

    return (
        <div className="gridWrapper ag-theme-material ag-theme-geekit">
            {!rowData.length ?
                <p className="loader">Loading, please wait...</p>
                :
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowHeight={rowHeight}
                    rowSelection={"single"}
                >
                </AgGridReact>}
        </div>
    );
};

export {GridView};