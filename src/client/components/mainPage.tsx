import '../styles/MainPage.css'

import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const userUrlId = new URLSearchParams(window.location.search).get('username') || ''
const masterSlave = new URLSearchParams(window.location.search).get('master')
// @ts-ignore
const socket = io({
  extraHeaders: { userurl: userUrlId, masterslave: masterSlave },
})

import { IMachine } from '../../model/settingsInterface'
import { IUser } from '../../model/usersInterface'
import * as IO from '../../model/socketConstants'
import RenderIFrame from './RenderIFrame'

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

  const RenderHeaderButtons = () => {
    return (
      <React.Fragment>
        {masterSlave ? (
          <div className={'grid'}>
            {activeRoomIndex !== undefined ? (
              <div className={'clientbutton'}>{thisUser?.accessRights[activeRoomIndex || 0]?.label || ''}</div>
            ) : (
              <div className={'clientbutton'}>SELECT PAGE ON MASTER</div>
            )}
            <React.Fragment>( Slave of: {masterSlave} )</React.Fragment>
          </div>
        ) : (
          <div className={'grid'}>
            <button
              key={'-1'}
              className={activeRoomIndex === -1 ? 'cardselected' : 'card'}
              onClick={() => {
                handleChangeRoom(-1)
              }}
            >
              OFFLINE
            </button>
            {thisUser?.accessRights?.map((accessRight, index) => {
              return (
                <button
                  key={index.toString()}
                  className={index === activeRoomIndex ? 'cardselected' : 'card'}
                  onClick={() => {
                    handleChangeRoom(index)
                  }}
                >
                  {accessRight.label || findMachine(thisUser?.accessRights[index].machineId)?.label}
                </button>
              )
            })}
          </div>
        )}
      </React.Fragment>
    )
  }

  const RenderActiveUsers = () => {
    return (
      <div className={'clientlist'}>
        USERS :
        {usersInRoom?.map((userInRoom, index) => {
          return (
            <button key={index.toString()} className={'clientbutton'}>
              {userInRoom}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={'container'}>
      {thisUser?.name ? (
        <div className={'main'}>
          <RenderHeaderButtons />
          {activeRoomIndex !== undefined && activeRoomIndex >= 0 ? (
            <React.Fragment>
              <RenderActiveUsers />
              <RenderIFrame
                src={
                  findMachine(thisUser?.accessRights[activeRoomIndex].machineId || '1')?.hostname +
                  (thisUser?.accessRights[activeRoomIndex].path || '')
                }
              />
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
