import React, { Component, useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import truffleContract from 'truffle-contract';
import getWeb3 from './utils/getWeb3';

import MySystemContract from './contracts/MySystem.json';

class App extends Component {
    constructor() {
        super();
        this.state = {
            userAccount: undefined,
            web3: undefined,
            mySystem: undefined,
            isOwner: false,
        };
    }
    //
    componentDidMount() {
        new Promise(async (resolve, reject) => {
            // load web3 and the user account
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            // load contract
            const ContractMySystem = truffleContract(MySystemContract);
            ContractMySystem.setProvider(web3.currentProvider);
            const instance = await ContractMySystem.deployed();
            // resolve
            const isOwner = await instance.isOwner({ from: accounts[0] });
            resolve({ userAccount: accounts[0], web3: web3, instance: instance, isOwner: isOwner });
        }).then((result) => {
            this.setState({
                userAccount: result.userAccount,
                mySystem: result.instance,
                web3: result.web3,
                isOwner: result.isOwner
            });
        });
    }
    //
    render() {
        const { web3, isOwner, mySystem, userAccount } = this.state;
        if (web3 === undefined) {
            return 'loading...';
        }
        return (
            <div>
                {isOwner && <InviteFormHook mySystem={mySystem} userAccount={userAccount} />}
                {<UserInvite mySystem={mySystem} userAccount={userAccount} />}
                {<UsersInfoHook mySystem={mySystem} userAccount={userAccount} />}
            </div>
        );
    }
}

function InviteFormHook(props) {
    const [addressInvite, setAddressInvite] = useState('');
    //
    function handleChange(event) {
        setAddressInvite(event.target.value);
    }
    //
    function handleSubmit(event) {
        const { mySystem, userAccount } = props;
        mySystem.inviteUser(addressInvite, { from: userAccount });
        event.preventDefault();
    }
    //
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Address to invite" value={addressInvite} onChange={handleChange} />
            <input type="submit" />
        </form>
    );
}

function UserInvite(props) {
    const [loading, setLoading] = useState(true);
    const [invited, setInvited] = useState(false);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        if (loading === true) {
            new Promise(async (resolve, reject) => {
                const { mySystem, userAccount } = props;
                const invited = await mySystem.isInvited(userAccount);
                resolve(invited);
            }).then((result) => {
                if (result === true) {
                    setInvited(true);
                }
                setLoading(false);
            });
        }
    });

    function handleSubmit(event) {
        const { mySystem, userAccount } = props;
        mySystem.join(username, age, { from: userAccount }).then((result) => {
            //
        }).catch((error) => {
            //
        });
        event.preventDefault();
    }

    function handleChange(event) {
        if (event.target.name === 'username') {
            setUsername(event.target.value);
        } else if (event.target.name === 'age') {
            setAge(event.target.value);
        }
    }

    function renderForm() {
        return <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" name="username" value={username} onChange={handleChange} required /> 
            <input type="text" placeholder="age" name="age" value={age} onChange={handleChange} required /> 
            <input type="submit" value="Accept Invitation" /> 
        </form>
    }

    return (
        <div>
            {invited && renderForm()}
        </div>
    );
}

function UsersInfoHook(props) {
    const [loading, setLoading] = useState(true);
    const [username, setUserName] = useState('');

    useEffect(() => {
        if (loading === true) {
            new Promise(async (resolve, reject) => {
                const { mySystem, userAccount } = props;
                const username = await mySystem.getUserName(userAccount);
                resolve(username);
            }).then((resultName) => {
                if (resultName.length > 0) {
                    setUserName(resultName);
                }
                setLoading(false);
            });
        }
    });

    return (
        <div>
            {username.length > 0 && <p>You are signed as {username}</p>}
        </div>
    );
}

export default App;
