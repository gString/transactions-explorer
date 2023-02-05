const myToken = "1DFKZR8XDU3XB9DUNCUPSGE6KE21HQH88P";

const statusCall = (_address: string): string => "https://api.etherscan.io/api?module=account" +
    "&action=txlist" +
    `&address=${_address}` +
    "&startblock=0" +
    "&endblock=99999999" +
    "&sort=asc" +
    `&apikey=${myToken}`;

type RawTransaction = {
    timeStamp: string,
    from: string,
    to: string,
    value: string,
    confirmations: string,
    hash: string,
}

export type Transaction = {
    date: string,
    from: string,
    to: string,
    value: string,
    confirmation: string,
    hash: string,

}

const setTime = (timestamp: string) => {
    const date = new Date(+timestamp * 1000);
    const formattedDate = ("0" + date.getDate()).slice(-2) + "/" + ("0"+(date.getMonth()+1)).slice(-2) + "/" +
        date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    return formattedDate;
}
export const getEtherscanTransactions = (address: string) => {
    return fetch(statusCall(address))
        .then(res => res.json())
        .then(json => Array
            .from(json.result)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            .map((item:RawTransaction) => (
                {
                    date: setTime(item.timeStamp),
                    from: item.from,
                    to: item.to,
                    value: item.value,
                    confirmation: item.confirmations,
                    hash: item.hash,
                }
            )))
};