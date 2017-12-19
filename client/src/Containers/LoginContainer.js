import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Login from '../Components/Login'

class LoginContainer extends Component {

    state = {
        loginActive: true,
        loginEmail: '',
        loginPassword: '',
        registerFirstName: '',
        registerLastName: '',
        registerEmail: '',
        registerPassword: '',
        registerPassword2: '',
        messageLoginError: {},
        messageRegisterError: {},
        messageRegisterSucces: false
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    login = async () => {
        const { loginEmail, loginPassword } = this.state
        const valid = this.validateLogin(loginEmail, loginPassword)

        if(valid.ok) {
            const loginResponse = await this.props.login({
                variables: {
                    email: loginEmail,
                    password: loginPassword
                },
            })
            
            const { ok, token, error } = loginResponse.data.login
            if(ok) {
                localStorage.setItem('token', token)
                this.props.history.push('/app')
            } else this.setState({ messageLoginError: { error: true, messages: [error.message] } })
        }
    }

    register = async () => {
        const { registerFirstName, registerLastName, registerEmail, registerPassword, registerPassword2 } = this.state
        const valid = this.validateRegister(registerFirstName, registerLastName, registerEmail, registerPassword, registerPassword2)

        if(valid.ok) {
            const registerResponse = await this.props.register({
                variables: {
                    firstName: registerFirstName,
                    lastName: registerLastName,
                    email: registerEmail,
                    password: registerPassword
                },
            })
            if(registerResponse.data.register.ok) this.handleChangeState('loginActive', true)
            else this.setState({ messageRegisterError: { error: true, message: [registerResponse.data.register.error.message]} })
        }
    }

    validateLogin = (email, password) => {
        let messages = []

        if(!email) messages = [...messages, 'Email is empty']

        else {
            let re = /\S+@\S+\.\S+/
            let emailTest = re.test(email)

            if(!emailTest) messages = [...messages, 'Email is incorrect']
        }

        if(!password) messages = [...messages, 'Password is empty']

        if(messages.length > 0) {
            this.setState({ messageLoginError: { error: true, messages } })
            return { ok: false, messages }
        }
        else return { ok: true }
    }

    validateRegister = (firstName, lastName, email, password, password2) => {
        let messages = []

        if(!firstName) messages = [...messages, 'First Name is empty']
        if(!lastName) messages = [...messages, 'Last Name is empty']
        if(!email) messages = [...messages, 'Email is empty']
        else {
            let re = /\S+@\S+\.\S+/
            let emailTest = re.test(email)
            if(!emailTest) messages = [...messages, 'Email is incorrect']
        }

        if(!password) messages = [...messages, 'Password is empty']
        if(!password2) messages = [...messages, 'Second Password is empty']
        if(password !== password2) messages = [...messages, 'Passwords are not the same']

        if(messages.length > 0) {
            this.setState({ messageRegisterError: { error: true, messages } })
            return { ok: false, messages }
        }
        else return { ok: true }
    }

    render() {
        return <Login login={this.login} register={this.register} handleChangeState={this.handleChangeState} state={this.state} />
    }
}

const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ok,
            token,
            error {
                message
            }
        }
    }
`
const registerMutation = gql`
    mutation register($firstName: String! $lastName: String! $email: String!, $password: String!) {
        register(firstName: $firstName lastName: $lastName email: $email, password: $password) {
            ok,
            error {
                message
            }
        }
    }
`

export default compose(
    graphql(loginMutation, { name: 'login' }),
    graphql(registerMutation, { name: 'register' }),
)(LoginContainer)
