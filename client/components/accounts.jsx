
const Accounts = (props) => {
    return (
        <ul className="mt-4">
            {
                props.accounts.map(account => (
                <li className="list-group-item list-group-item-action" key={account.id}>
                    <h5>{account.id} - {account.account}</h5>
                </li>
                ))
            }
        </ul>
    )
}

export default Accounts