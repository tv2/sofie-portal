import '../styles/MainPage.css'
import '../styles/IframeView.css'

import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const userUrlId =
    new URLSearchParams(window.location.search).get('username') || ''
// @ts-ignore
const socket = io({ extraHeaders: { userurl: userUrlId } })

import { IMachine } from '../../model/settingsInterface'
import { IUser, IUserAccessRights } from '../../model/usersInterface'
import * as IO from '../../model/socketConstants'

const MainPage = () => {
    const [usersInRoom, setUsersInRoom] = useState<Array<string>>([])
    const [thisUser, setThisUser] = useState<IUser>()
    const [activeRoomIndex, setRoomIndex] = useState<number>(-1)
    const [machines, setMachines] = useState<IMachine[]>()

    useEffect(() => {
        if (socket) {
            socket.on(IO.THIS_USER, (payload: any) => {
                setThisUser(payload)
            })

            socket.on(IO.USERS_IN_ROOM, (socketPayload: any) => {
                setUsersInRoom(socketPayload)
            })
            socket.on(IO.MACHINES, (socketPayload: any) => {
                setMachines(socketPayload)
            })
        }
    }, [socket])

    const handleChangeRoom = (room: IUserAccessRights, index: number) => {
        setRoomIndex(index)
        socket.emit(IO.JOIN_ROOM, room.machineId)
    }

    const findMachine = (id: string) => {
        return machines?.find((machine) => {
            return machine.id === id
        })
    }

    return (
        <div className={'container'}>
            {thisUser?.accessRights?.[0].machineId !== '-1' ? (
                <div className={'main'}>
                    <div className={'grid'}>
                        {thisUser?.accessRights?.map((accessRight, index) => {
                            return (
                                <button
                                    key={index.toString()}
                                    className={
                                        index === activeRoomIndex
                                            ? 'cardselected'
                                            : 'card'
                                    }
                                    onClick={() => {
                                        handleChangeRoom(accessRight, index)
                                    }}
                                >
                                    {accessRight.label ||
                                        findMachine(
                                            thisUser?.accessRights[index]
                                                .machineId
                                        )?.label}
                                </button>
                            )
                        })}
                    </div>
                    {activeRoomIndex >= 0 ? (
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
                <h1 className={'main'}>WRONG USER LOGIN</h1>
            )}
        </div>
    )
}

export default MainPage
