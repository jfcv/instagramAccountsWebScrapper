import {useState} from 'react'

const AddAccount = ({accounts, setAccounts}) => {

    const onChange = (e) => {
        setAccounts({
            data: accounts.data,
            url: e.target.value
        });
    }

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    }

    const onSubmitForm = async (e) => {
        
        e.preventDefault();

        try {
            if(accounts.url !== '') {
                setAccounts({
                    data: [...accounts.data, {account: accounts.url}],
                    url: ''
                });
                handleReset();
            } else {
                console.log('empty form');
            }
        } catch (err) {
            console.error(err.message);
        }
        
    }

    return (
        <form className="d-flex flex-column mt-5">
            
            <input 
                id="inputText"
                type="text" 
                className="form-control" 
                onChange={onChange}
            />

            <button 
                type="button" 
                className="btn btn-outline-primary mt-2"
                onClick={onSubmitForm}
            >
                Add Account
            </button>

        </form>

    )
}

export default AddAccount