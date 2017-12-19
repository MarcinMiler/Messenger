import React from 'react'
import styled, { keyframes } from 'styled-components'
// import IconRight from 'react-icons/lib/md/arrow-forward'
import { Message } from 'semantic-ui-react'

const Login = ({
    login,
    register,
    handleChangeState,
    state
}) => { 
    return(
        <div>
            <WrapOne>
                <TextWrap>
                    <FormSwitch active={state.loginActive} onClick={() => handleChangeState('loginActive', true) }>Login</FormSwitch>
                </TextWrap>

                <TextWrap>
                    <FormSwitch active={state.registerActive} onClick={() => handleChangeState('loginActive', false) }>Register</FormSwitch>
                </TextWrap>
                
                {
                    state.loginActive

                    ?   <div>

                            <WrapInput>
                                {
                                    state.messageLoginError.error
                                        ? <Message 
                                            error
                                            header='Something goes wrong'
                                            list={[...state.messageLoginError.messages]}/>

                                        : <div></div>
                                }

                                <Group>
                                    <Input type="text" required key={1} onChange={e => handleChangeState('loginEmail', e.target.value) }/>
                                    <Label>Email</Label>
                                </Group>

                                <Group>
                                    <Input type="password" required key={2} onChange={e => handleChangeState('loginPassword', e.target.value)}/>
                                    <Label>Password</Label>
                                </Group>

                                <Button onClick={ login }>Login</Button>
                            </WrapInput>
                            
                        </div>
                    
                    :   <div>

                            <WrapInput2>
                                {
                                    state.messageRegisterError.error
                                        ? <Message 
                                            error
                                            header='Something goes wrong'
                                            list={[...state.messageRegisterError.messages]}/>

                                        : <div></div>
                                }
                                <Group>
                                    <Input type="text" required key={3} onChange={e => handleChangeState('registerFirstName', e.target.value)} />
                                    <Label>First Name</Label>
                                </Group>

                                <Group>
                                    <Input type="text" required key={4} onChange={e => handleChangeState('registerLastName', e.target.value)} />
                                    <Label>Last Name</Label>
                                </Group>

                                <Group>
                                    <Input type="text" required key={5} onChange={e => handleChangeState('registerEmail', e.target.value)} />
                                    <Label>Email</Label>
                                </Group>

                                <Group>
                                    <Input type="password" required key={6} onChange={e => handleChangeState('registerPassword', e.target.value)}/>
                                    <Label>Password</Label>
                                </Group>

                                <Group>
                                    <Input type="password" required key={7} onChange={e => handleChangeState('registerPassword2', e.target.value)}/>
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
)}

export default Login

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