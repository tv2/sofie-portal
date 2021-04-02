import '../styles/AdminPage.css'

import React, { useState, useEffect } from 'react'
//@ts-ignore
import Files from 'react-files'
import { io } from 'socket.io-client'

const userUrlId =
    new URLSearchParams(window.location.search).get('username') || ''
// @ts-ignore
const socket = io({ extraHeaders: { userurl: userUrlId } })

import { IWebPage } from '../../model/settingsInterface'
import { IUser, IUserAccessRights } from '../../model/usersInterface'
import * as IO from '../../model/socketConstants'
import { loadUserFile, saveUserFile } from '../utils/localStorage'

const AdminPage = () => {
    const [selectedUser, setSelectedUser] = useState<number>(0)
    const [allUsers, setAllUsers] = useState<IUser[]>([])
    const [webpages, setWebpages] = useState<IWebPage[]>([])

    useEffect(() => {
        if (socket) {
            socket.on(IO.ADMIN_ALL_USERS, (payload: any) => {
                setAllUsers(payload)
            })
            socket.on(IO.ADMIN_ALL_WEBPAGES, (payload: any) => {
                setWebpages(payload)
            })
            socket.emit(IO.ADMIN_GET_DATA)
        }
    }, [socket])

    const findWebpage = (id: string) => {
        return webpages?.find((webpage) => {
            return webpage.id === id
        })
    }

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
            changed[selectedUser].accessRights[index].webpageId =
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
        if (selectedUser) {
            let addedAccess = allUsers
            addedAccess[selectedUser].accessRights.push({
                webpageId: '',
                label: '',
                path: '',
            })
            setAllUsers([...addedAccess])
        }
    }

    const handleAddUser = () => {
        let addedUser = allUsers
        addedUser?.push({
            id: '',
            name: '',
            accessRights: [],
        })
        setAllUsers([...addedUser])
    }

    const handleSaveUsers = () => {
        socket.emit(IO.ADMIN_STORE_USERS_JSON, allUsers)
    }

    const handleDownload = () => {
        saveUserFile(allUsers)
    }

    const handleUpload = (event: any) => {
        console.log('upload file : ', event[0])
        loadUserFile(event[0])
        .then((response:any ) => {
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
                <select onChange={(event) => handleSelectUser(event)}>
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
                        handleAddUser()
                    }}
                >
                    Add New User
                </button>
            </div>
            <hr />
            <div className={'pageslist'}>USER :</div>

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
            <div className={'pageslist'}>ACCESS RIGHTS :</div>

            {allUsers[selectedUser]?.accessRights.map(
                (accessRight: IUserAccessRights, index: number) => {
                    return (
                        <div key={index} className={'pageslist'}>
                            <form>
                                <label className={'inputlabel'}>
                                    WebPage :
                                    <select
                                        onChange={(event) =>
                                            handleAccessId(event, index)
                                        }
                                    >
                                        {webpages.map((webpage: IWebPage) => {
                                            return (
                                                <option
                                                    selected={
                                                        accessRight.webpageId ===
                                                        webpage.id
                                                    }
                                                    key={index}
                                                    value={webpage.id}
                                                >
                                                    {webpage.label}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </label>
                                <label className={'inputlabel'}>
                                    Button Label:
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
            <div className={'pageslist'}>
                <button
                    className={'adminbutton'}
                    onClick={() => {
                        handleDownload()
                    }}
                >
                    DOWNLOAD FILE
                </button>

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
                <button
                    className={'adminbutton'}
                    onClick={() => {
                        handleSaveUsers()
                    }}
                >
                    SAVE DATA TO SERVER
                </button>
            </div>
        </div>
    )
}

export default AdminPage
