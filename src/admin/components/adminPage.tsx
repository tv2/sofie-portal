import '../styles/AdminPage.css'

import React, { useState, useEffect } from 'react'
//@ts-ignore
import Files from 'react-files'
import { io } from 'socket.io-client'

const userUrlId =
    new URLSearchParams(window.location.search).get('username') || ''
// @ts-ignore
const socket = io({ extraHeaders: { userurl: userUrlId } })

import { IMachine } from '../../model/settingsInterface'
import { IUser, IUserAccessRights } from '../../model/usersInterface'
import * as IO from '../../model/socketConstants'
import { loadUserFile } from '../utils/localStorage'

const AdminPage = () => {
    const [selectedUser, setSelectedUser] = useState<number>(0)
    const [allUsers, setAllUsers] = useState<IUser[]>([])
    const [machines, setMachines] = useState<IMachine[]>([])
    const [accessRightsBuffer, setAccessRightsBuffer] = useState<
        IUserAccessRights[]
    >([])

    useEffect(() => {
        if (socket) {
            socket.on(IO.ADMIN_ALL_USERS, (payload: any) => {
                setAllUsers(payload)
            })
            socket.on(IO.ADMIN_ALL_MACHINES, (payload: any) => {
                setMachines(payload)
            })
            socket.emit(IO.ADMIN_GET_DATA)
        }
    }, [socket])

    const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(parseInt(event.target.value))
    }

    const handleUserIdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let changed = allUsers
        changed[selectedUser].id = event.target.value
        setAllUsers([...changed])
    }

    const handleUserNameInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let changed = allUsers
        changed[selectedUser].name = event.target.value
        setAllUsers([...changed])
    }

    const handleAccessId = (
        event: React.ChangeEvent<HTMLSelectElement>,
        index: number
    ) => {
        let changed = allUsers
        if (changed[selectedUser].accessRights[index]) {
            changed[selectedUser].accessRights[index].machineId =
                event.target.value
            setAllUsers([...changed])
        }
    }

    const handleAccessTextInput = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
        property: string
    ) => {
        let changed = allUsers
        if (changed[selectedUser].accessRights[index]) {
            changed[selectedUser].accessRights[index][
                property as keyof IUserAccessRights
            ] = event.target.value
            setAllUsers([...changed])
        }
    }

    const handleAddWebPage = () => {
        let addedAccess = allUsers
        addedAccess[selectedUser].accessRights.push({
            machineId: machines[0].id,
            label: '',
            path: '',
        })
        setAllUsers([...addedAccess])
    }

    const handleRemoveWebPage = (accessIndex: number) => {
        let removedAccess = allUsers
        removedAccess[selectedUser].accessRights.splice(accessIndex, 1)
        setAllUsers([...removedAccess])
    }

    const handleAddUser = () => {
        let addedUser = allUsers
        addedUser?.push({
            id: 'newuser',
            name: 'newuser',
            accessRights: [],
        })
        setAllUsers([...addedUser])
        setSelectedUser(allUsers.length - 1)
    }

    const handleCopyUserRights = () => {
        setAccessRightsBuffer([...allUsers[selectedUser].accessRights])
    }

    const handlePasteUserRights = () => {
        if (accessRightsBuffer !== []) {
            let changedUsers = allUsers
            changedUsers[selectedUser].accessRights = accessRightsBuffer
            setAllUsers([...changedUsers])
        }
    }

    const handleSaveUsers = () => {
        socket.emit(IO.ADMIN_STORE_USERS_JSON, allUsers)
    }

    const handleRestartServer = () => {
        socket.emit(IO.ADMIN_RESTART_SERVER)
    }

    const handleUpload = (event: any) => {
        console.log('upload file : ', event[0])
        loadUserFile(event[0]).then((response: any) => {
            if (response) {
                setAllUsers(JSON.parse(response).users)
            }
        })
    }

    return (
        <div className={'container'}>
            <div className={'adminheader'}>USER ACCESS ADMINISTRATION:</div>

            <div className={'pageslist'}>
                <div>SELECT USER :</div>
                <select
                    value={selectedUser}
                    onChange={(event) => handleSelectUser(event)}
                >
                    {allUsers.map((user: IUser, index: number) => {
                        return (
                            <option key={index} value={index}>
                                {user.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className={'pageslist'}>
                <button
                    className={'adminbutton'}
                    onClick={() => {
                        handleCopyUserRights()
                    }}
                >
                    Copy User Access
                </button>
                <button
                    className={'adminbutton'}
                    onClick={() => {
                        handlePasteUserRights()
                    }}
                >
                    Paste User Access
                </button>
                <button
                    className={'adminbutton'}
                    onClick={() => {
                        handleAddUser()
                    }}
                >
                    Add New User
                </button>
            </div>
            <hr />
            <div className={'pageslist'}>USER INFO :</div>

            {allUsers[selectedUser] ? (
                <div className={'pageslist'}>
                    <form>
                        <label className={'inputlabel'}>
                            User Id:
                            <input
                                type="text"
                                value={allUsers[selectedUser].id}
                                onChange={(event) => handleUserIdInput(event)}
                            />
                        </label>
                        <label className={'inputlabel'}>
                            User Label:
                            <input
                                type="text"
                                value={allUsers[selectedUser].name}
                                onChange={(event) => handleUserNameInput(event)}
                            />
                        </label>
                    </form>
                </div>
            ) : (
                <React.Fragment></React.Fragment>
            )}
            <hr />
            <div className={'pageslist'}>USER PAGES ACCESS RIGHTS :</div>

            {allUsers[selectedUser]?.accessRights.map(
                (accessRight: IUserAccessRights, index: number) => {
                    return (
                        <div key={index} className={'pageslist'}>
                            <form>
                                <label className={'inputlabel'}>
                                    Machine :
                                    <select
                                        onChange={(event) =>
                                            handleAccessId(event, index)
                                        }
                                    >
                                        {machines.map((machine: IMachine) => {
                                            return (
                                                <option
                                                    selected={
                                                        accessRight.machineId ===
                                                        machine.id
                                                    }
                                                    key={index}
                                                    value={machine.id}
                                                >
                                                    {machine.label}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </label>
                                <label className={'inputlabel'}>
                                    Special Label:
                                    <input
                                        type="text"
                                        value={accessRight.label}
                                        onChange={(event) =>
                                            handleAccessTextInput(
                                                event,
                                                index,
                                                'label'
                                            )
                                        }
                                    />
                                </label>
                                <label className={'inputlabel'}>
                                    Path and Args:
                                    <input
                                        type="text"
                                        value={accessRight.path}
                                        onChange={(event) =>
                                            handleAccessTextInput(
                                                event,
                                                index,
                                                'path'
                                            )
                                        }
                                    />
                                </label>
                            </form>
                            <button
                                className={'remove-item-button'}
                                onClick={() => {
                                    handleRemoveWebPage(index)
                                }}
                            >
                                X
                            </button>
                        </div>
                    )
                }
            )}

            <div className={'pageslist'}>
                <button
                    className={'adminbutton'}
                    onClick={() => {
                        handleAddWebPage()
                    }}
                >
                    Add New Weblink
                </button>
            </div>
            <hr />
            <div className={'pageslist'}>EDIT USERS EXTERNALLY :</div>
            <div className={'pageslist'}>
                <a
                    className={'adminbutton'}
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify({ users: allUsers })
                    )}`}
                    download="users.json"
                >
                    DOWNLOAD FILE
                </a>
                <Files
                    className={'adminbutton'}
                    accepts={['.json']}
                    type="file"
                    onChange={(event: any) => {
                        handleUpload(event)
                    }}
                >
                    UPLOAD FILE
                </Files>
            </div>
            <hr />

            <div className={'pageslist'}>SERVER HANDLING :</div>
            <div className={'pageslist'}>
                <button
                    className={'adminbutton'}
                    onClick={() => {
                        handleSaveUsers()
                    }}
                >
                    SAVE DATA TO SERVER
                </button>
                <button
                    className={'adminbutton'}
                    onClick={() => {
                        handleRestartServer()
                    }}
                >
                    RESTART SERVER
                </button>
            </div>
            <hr />
        </div>
    )
}

export default AdminPage
