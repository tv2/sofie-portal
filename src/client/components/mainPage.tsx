import '../styles/MainPage.css'
import '../styles/IframeView.css'

import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const userUrlId =
    new URLSearchParams(window.location.search).get('username') || ''
const masterSlave = new URLSearchParams(window.location.search).get('master')
// @ts-ignore
const socket = io({
    extraHeaders: { userurl: userUrlId, masterslave: masterSlave },
})

import { IMachine } from '../../model/settingsInterface'
import { IUser } from '../../model/usersInterface'
import * as IO from '../../model/socketConstants'

const MainPage = () => {
    const [usersInRoom, setUsersInRoom] = useState<Array<string>>([])
    const [thisUser, setThisUser] = useState<IUser>()
    const [activeRoomIndex, setActiveRoomIndex] = useState<number>()
    const [machines, setMachines] = useState<IMachine[]>()

    useEffect(() => {
        socket.on(IO.THIS_USER, (payload: any) => {
            setThisUser(payload)
        })

        socket.on(IO.USERS_IN_ROOM, (socketPayload: any) => {
            setUsersInRoom(socketPayload)
        })
        socket.on(IO.MACHINES, (socketPayload: any) => {
            setMachines(socketPayload)
        })
        socket.on(IO.SLAVE_SET_ROOM, (buttonIndex: number) => {
            if (buttonIndex !== activeRoomIndex) {
                if (thisUser && buttonIndex < thisUser.accessRights.length) {
                    handleChangeRoom(buttonIndex)
                }
            }
        })
    }, [activeRoomIndex, thisUser])

    const handleChangeRoom = (buttonIndex: number) => {
        setActiveRoomIndex(buttonIndex)
        socket.emit(IO.JOIN_ROOM, buttonIndex)
    }

    const findMachine = (id: string) => {
        return machines?.find((machine) => {
            return machine.id === id
        })
    }

    return (
        <div className={'container'}>
            {thisUser?.name ? (
                <div className={'main'}>
                    {masterSlave ? (
                        <div className={'grid'}>
                            {activeRoomIndex !== undefined ? (
                                <div className={'clientbutton'}>
                                    {
                                        thisUser.accessRights[activeRoomIndex]
                                            ?.label
                                    }
                                </div>
                            ) : (
                                <div className={'clientbutton'}>
                                    SELECT PAGE ON MASTER
                                </div>
                            )}
                            <React.Fragment>
                                ( Slave of: {masterSlave} )
                            </React.Fragment>
                        </div>
                    ) : (
                        <div className={'grid'}>
                            {thisUser?.accessRights?.map(
                                (accessRight, index) => {
                                    return (
                                        <button
                                            key={index.toString()}
                                            className={
                                                index === activeRoomIndex
                                                    ? 'cardselected'
                                                    : 'card'
                                            }
                                            onClick={() => {
                                                handleChangeRoom(index)
                                            }}
                                        >
                                            {accessRight.label ||
                                                findMachine(
                                                    thisUser?.accessRights[
                                                        index
                                                    ].machineId
                                                )?.label}
                                        </button>
                                    )
                                }
                            )}
                        </div>
                    )}
                    {activeRoomIndex !== undefined ? (
                        <React.Fragment>
                            <div className={'clientlist'}>
                                USERS :
                                {usersInRoom?.map((userInRoom, index) => {
                                    return (
                                        <button
                                            key={index.toString()}
                                            className={'clientbutton'}
                                        >
                                            {userInRoom}
                                        </button>
                                    )
                                })}
                            </div>

                            <iframe
                                className={'iframeview'}
                                src={
                                    findMachine(
                                        thisUser?.accessRights[activeRoomIndex]
                                            .machineId || '1'
                                    )?.hostname +
                                    (thisUser?.accessRights[activeRoomIndex]
                                        .path || '')
                                }
                            ></iframe>
                        </React.Fragment>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}
                </div>
            ) : (
                <WrongUser />
            )}
        </div>
    )
}

const WrongUser = () => {
    return (
        <div className={'main'}>
            <h1>Sofie User Portal </h1>
            <h2>Access portal with xxx.xxx.xxx/?username=your-user-id</h2>
        </div>
    )
}

export default MainPage
