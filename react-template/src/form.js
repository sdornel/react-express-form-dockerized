import React from 'react';

export default class Form extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            supervisors: [],
            supervisor: '',
            firstNameInvalid: true,
            lastNameInvalid: true,
            emailInvalid: false,
            phoneNumberInvalid: false,
        }
    }

    componentDidMount() {
        this.getSupervisors();
    }

    getSupervisors = async () => {
        const request = await fetch('http://localhost:8080/api/supervisors')
        const data = await request.json();
        this.setState({ supervisors: data });
    }


    onFirstNameChange = (event) => {
        this.setState({ firstName: event.target.value }, () => {
            this.validateNames('firstName');
        });
    }

    onLastNameChange = (event) => {
        this.setState({ lastName: event.target.value }, () => {
            this.validateNames('lastName');
        });
    }

    validateNames(nameType) {
        if (nameType === 'firstName') {
            if (/\d/.test(this.state.firstName) || this.state.firstName === '') {
                this.setState({ firstNameInvalid: true })
            } else {
                this.setState({ firstNameInvalid: false })
            }
        }
        if (nameType === 'lastName') {
            if (/\d/.test(this.state.lastName) || this.state.lastName === '') {
                this.setState({ lastNameInvalid: true })
            } else {
                this.setState({ lastNameInvalid: false })
            }
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value }, () => {
            this.emailValidation();
        });
    }

    emailValidation(){
        const regex = /\S+@\S+\.\S+/;
        if((!regex.test(this.state.email) && this.state.email !== '')) {
            this.setState({ emailInvalid: true });
        } else {
            this.setState({ emailInvalid: false });
        }
    }

    onPhoneNumberChange = (event) => {
        this.setState({ phoneNumber: event.target.value }, () => {
            if (
                (this.state.phoneNumber.length !== 10 && this.state.phoneNumber !== '') ||
                /[a-zA-Z]/.test(this.state.phoneNumber)
            ) {
                this.setState({ phoneNumberInvalid: true });
            } else {
                this.setState({ phoneNumberInvalid: false });
            }
        });
    }

    onSupervisorChange = (event) => {
        this.setState({ supervisor: event.target.value });
    }

    handleSubmit = () => {
        const dataToSubmit = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            supervisor: this.state.supervisor,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
        }
        fetch('http://localhost:8080/api/submit', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            },
            body: JSON.stringify(dataToSubmit),
        })
    }

    checkDisabled = () => {
        if (this.state.firstNameInvalid || this.state.lastNameInvalid || this.state.supervisor === '') {
            return true;
        } 
        if (this.state.emailInvalid) {
            return true;
        }
        if (this.state.phoneNumberInvalid) {
            return true;
        }
        return false;
    }
    render() {
        return (
            <div>
                First Name: <input onChange={(event) => this.onFirstNameChange(event)}/>
                {
                    this.state.firstNameInvalid && this.state.firstName !== '' ? 
                    <div>
                        <span>Name fields cannot contain numbers</span>
                    </div>
                    : 
                    null
                }
                <br/><br/>
                Last Name: <input onChange={(event) => this.onLastNameChange(event)}/>
                {
                    this.state.lastNameInvalid && this.state.lastName !== '' ? 
                    <div>
                        <span>Name fields cannot contain numbers</span>
                    </div>
                    : 
                    null
                }
                <br/><br/>
                Supervisor: <select onChange={(event) => this.onSupervisorChange(event)}>
                    <option>Select a supervisor here</option>
                    {
                        this.state.supervisors.map((supervisor) => {
                            return (
                                <option>{supervisor.jurisdiction} - {supervisor.lastName} {supervisor.firstName}</option>
                            )
                        })
                    }
                    
                </select>
                <br/><br/>
                <h3>Enter either an email address or phone number</h3>
                Email: <input onChange={(event) => this.onEmailChange(event)}/>
                {
                    this.state.emailInvalid && this.state.email !== '' ? 
                    <div>
                        <span>Email must be valid</span>
                    </div>
                    : 
                    null
                }
                <br/><br/>
                Phone Number (numbers only): <input onChange={(event) => this.onPhoneNumberChange(event)}/>
                {
                    this.state.phoneNumberInvalid && this.state.phoneNumber !== '' ? 
                    <div>
                        <span>Phone Number must be valid</span>
                    </div>
                    : 
                    null
                }
                <br/><br/>
                <button onClick={() => this.handleSubmit()} disabled={this.checkDisabled()}>Submit</button>
            </div>
        )
    }
}