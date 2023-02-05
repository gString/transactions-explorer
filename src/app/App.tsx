import "./app.css";
import {useState} from "react";
import {GetAddress} from "./GetAddress";
import {GridView} from "./GridView";


function App() {
    const [verifiedAddress, setVerifiedAddress] = useState("");

    const getTransactions = async (address: string) => {
        setVerifiedAddress(address);
    }

    const isVerified = Boolean(verifiedAddress.length);

    return (
        <div className="main">
            <header>
                <h1 className="title">Transactions Explorer</h1>
                {isVerified && <button className="backBtn" title="Go back" onClick={() => setVerifiedAddress("")}>&#8592;</button>}
            </header>
            {isVerified ?
                <GridView address={verifiedAddress}/>
                :
                <GetAddress
                    getTransactions={getTransactions}/>}
        </div>
    )
}

export default App
