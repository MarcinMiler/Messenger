import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Button, Header, Input, Modal, Form, Icon, Image, Tab } from 'semantic-ui-react'

const UserModal = ({
    onClose,
    open,
    me,
    addFriends,
    state,
    handleChangeState,
    updateFirstName,
    updateLastName,
    updateEmail,
    updatePassword,
    updatePhoto,
}) => (
    <Modal
        open={open}
        onClose={onClose}
        size='large'
    >
        <Modal.Header>User Settings</Modal.Header>
        <Modal.Content image>
        <Image wrapped size='medium' src={me.photo} />
            <Modal.Description>
                <Header>{ me.firstName } { me.lastName }</Header>
                <p>Click to Change</p>
                <Button.Group>
                    {
                        state.buttons.map((button, i) => {
                            return(
                                <Button key={i} onClick={() => handleChangeState('active', button)}>{button}</Button>
                            )
                        })
                    }
                </Button.Group>

                <div>
                { state.active === 'First Name'
                    ?
                        <div>
                            <StyledInput name="firstName" placeholder=" New first name" onChange={e => handleChangeState('firstName', e.target.value)} />
                            <Button onClick={ updateFirstName } animated color="green" style={{ display: 'block', marginTop: '10px' }}>
                                <Button.Content visible>Submit</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                        </div>
                    : 
                        <div></div>
                }

                { state.active === 'Last Name'
                    ?
                        <div>
                            <StyledInput name="lastName" placeholder="New last name" onChange={e => handleChangeState('lastName', e.target.value)} />
                            <Button onClick={ updateLastName } animated color="green" style={{ display: 'block', marginTop: '10px' }}>
                                <Button.Content visible>Submit</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                        </div>
                    :
                        <div></div>
                }

                { state.active === 'Email'
                    ?
                        <div>
                            <StyledInput name="oldEmail" placeholder="Old Email" onChange={e => handleChangeState('oldEmail', e.target.value)} />
                            <StyledInput name="oldEmail" placeholder="New Email" onChange={e => handleChangeState('newEmail', e.target.value)} />
                            <Button onClick={ updateEmail } animated color="green" style={{ display: 'block', marginTop: '10px' }}>
                                <Button.Content visible>Submit</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                        </div>
                    :
                        <div></div>
                }

                { state.active === 'Password'
                    ?
                        <div>
                            <StyledInput name="oldPassword" placeholder="Old password" onChange={e => handleChangeState('oldPassword', e.target.value)} />
                            <StyledInput name="newPassword" placeholder="New password" onChange={e => handleChangeState('newPassword', e.target.value)} />
                            <Button onClick={ updatePassword } animated color="green" style={{ display: 'block', marginTop: '10px' }}>
                                <Button.Content visible>Submit</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                        </div>
                    :
                        <div></div>
                }

                { state.active === 'Photo'
                    ?
                        <div>
                            <StyledInput name="photo" placeholder="New photo" onChange={e => handleChangeState('photo', e.target.value)} />
                            <Button onClick={ updatePhoto } animated color="green" style={{ display: 'block', marginTop: '10px' }}>
                                <Button.Content visible>Submit</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                        </div>
                    :
                        <div></div>
                }
            </div>

            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onClose} inverted color='red'>Close</Button>
        </Modal.Actions>
    </Modal>
)

export default UserModal

const StyledInput = styled(Input)`
    margin: 10px 10px 0 0;
`