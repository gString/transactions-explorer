import React, {useState} from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ethereum_address = require('ethereum-address');

const GetAddress = ({getTransactions}: { getTransactions: (address: string) => void }) => {
    const [address, setAddress] = useState<string>("");
    const [isValid, setIsValid] = useState(false);

    const checkAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        if (ethereum_address.isAddress(e.target.value)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    const submitAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getTransactions(address);
    }

    return (
        <form className="addressForm" onSubmit={submitAddress}>
            <input className="address"
                   value={address}
                   onChange={checkAddress}
                   placeholder="Please enter a valid address here"
            />
            <button className="getAddressButton"
                    disabled={!isValid}
                    type="submit">
                Get Transactions
            </button>
        </form>
    );
};

export {GetAddress};