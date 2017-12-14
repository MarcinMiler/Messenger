import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import IconRight from 'react-icons/lib/md/arrow-forward'

class Login extends Component {

    state = {
        loginActive: true,
        registerActive: false,
        loginEmail: '',
        loginPassword: '',
        registerFirstName: '',
        registerLastName: '',
        registerEmail: '',
        registerPassword: '',
    }

    render() {
        console.log(this.props)

        const login = async () => {
            const loginResponse = await this.props.login({
                variables: {
                    email: this.state.loginEmail,
                    password: this.state.loginPassword
                },
            })
            console.log(loginResponse, 'login')
            const { ok, token, errors } = loginResponse.data.login
            if(ok) {
                localStorage.setItem('token', token)
                this.props.history.push('/app')
            }
        }

        const register = async () => {
            const registerResponse = await this.props.register({
                variables: {
                    firstName: this.state.registerFirstName,
                    lastName: this.state.registerLastName,
                    photo: this.state.registerPhoto,
                    email: this.state.registerEmail,
                    password: this.state.registerPassword
                },
            })
            console.log(registerResponse, 'reg')
        }

        return(
            <div>
            <WrapOne>
                <TextWrap>
                    <FormSwitch active={this.state.loginActive} onClick={() => this.setState({loginActive: true, registerActive: false})}>Login</FormSwitch>
                </TextWrap>

                <TextWrap>
                    <FormSwitch active={this.state.registerActive} onClick={() => this.setState({loginActive: false, registerActive: true})}>Register</FormSwitch>
                </TextWrap>
                
                
                {
                    this.state.loginActive 
                    
                    ?   <div>
                            <WrapInput>
                                <Group>
                                <Input type="text" required key={1} onChange={(e) => this.setState({loginEmail: e.target.value})}/>
                                <Label>Email</Label>
                                </Group>
                                <Group>
                                <Input type="password" required key={2} onChange={(e) => this.setState({loginPassword: e.target.value})}/>
                                <Label>Password</Label>
                                </Group>
                                <Button onClick={ login }>Login</Button>
                            </WrapInput>
                            
                        </div>
                    
                    :   <div>
                            <WrapInput2>

                            <Group>
                            <Input type="text" required key={3} onChange={(e) => this.setState({registerFirstName: e.target.value})} />
                            <Label>First Name</Label>
                            </Group>

                            <Group>
                            <Input type="text" required key={4} onChange={(e) => this.setState({registerLastName: e.target.value})} />
                            <Label>Last Name</Label>
                            </Group>

                            <Group>
                            <Input type="text" required key={5} onChange={(e) => this.setState({registerEmail: e.target.value})} />
                            <Label>Email</Label>
                            </Group>

                            <Group>
                            <Input type="password" required key={6} onChange={(e) => this.setState({registerPassword: e.target.value})}/>
                            <Label>Password</Label>
                            </Group>

                            <Button onClick={ register }>Register</Button>
                            </WrapInput2>
                        </div>
                }
                
                
            </WrapOne>

            <WrapTwo>
                <Title>Messenger</Title>
            </WrapTwo>
        </div>
        )
    }
}

const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ok,
            token,
            errors {
                message
            }
        }
    }
`
const registerMutation = gql`
    mutation register($firstName: String! $lastName: String! $email: String!, $password: String!) {
        register(firstName: $firstName lastName: $lastName email: $email, password: $password) {
            ok,
            errors {
                message
            }
        }
    }
`

export default compose(
    graphql(loginMutation, { name: 'login' }),
    graphql(registerMutation, { name: 'register' }),
)(Login)

const fade = keyframes`
    from {
        left: -200px;
        opacity: 0;
    }
    to {
        left: 0px;
        opacity: 1;
    }
`
const WrapOne = styled.div`
    width: 30%;
    height: 100vh;
    display: inline-block;
`
const WrapTwo = styled.div`
    position: absolute;
    width: 70%;
    height: 100vh;
    display: inline-block;
    background-image: linear-gradient(to right, #28394E 0%, #61779A 100%);
`
const Title = styled.h1`
    font-size: 72px;
    color: white;
    text-align: center;
`
const TextWrap = styled.div`
    width: 50%;
    margin: 80px 0 0 0;
    display: inline-block;
    text-align: center;
`
const FormSwitch = styled.h1`
    font-size: 32px;
    font-weight: 400;
    display: inline-block;
    transition: all 300ms ease-out;
    color: ${props => props.active ? '#3076CC ' : 'black'};
    cursor: pointer;
`
const WrapInput = styled.div`
    position: relative;
    animation: ${fade} 1s;
    width: 70%;
    margin: 80px auto 0 auto;
`
const WrapInput2 = styled(WrapInput)``
const Group = styled.div`
    position: relative;
`
const Label = styled.label`
    position: absolute;
    top: 5px;
    font-size: 18px;
    color: gray;
    transition: all 150ms ease-in;
    pointer-events: none;
`
const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid lightgray;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 0 5px 0;
    transition: all 300ms ease-out;
    margin: 40px 0 0 0;
    z-index: 200;
    display: block;

    &:focus {
        outline: none;
        border-bottom: 1px solid #3076CC;
        color: #3076CC;
    }
    &:focus + label, &:valid + label{
        position: absolute;
        top: -10px;
        font-size: 12px;
        color: #3076CC;
    }
    
`
const Button = styled.button`
    width: 150px;
    height: 40px;
    background-color: #3076CC;
    display: block;
    border: none;
    border-radius: 5px;
    outline: none;
    margin: 30px 0 0 0;
    float: right;
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    overflow: hidden;
`