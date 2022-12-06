import '../userList/userlist.scss'
import React, { useState } from 'react';
import Users from "../../users.json";
const UserList = () => {
    const [active, setActive] = useState();
    return (
        <section className={"userlist"}>
            <div className="userlist__header">
                <h2>Users</h2>
                <button className={"userlist__header__button"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <g id="Group_71" data-name="Group 71" transform="translate(-448 -83)">
                            <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(448 83)" fill="none" stroke="#fff">
                                <circle cx="16" cy="16" r="16" stroke="none"/>
                                <circle cx="16" cy="16" r="15" fill="none"/>
                            </g>
                            <g id="Group_70" data-name="Group 70">
                                <circle id="Ellipse_2" data-name="Ellipse 2" cx="2.5" cy="2.5" r="2.5" transform="translate(454 97)" fill="#fff"/>
                                <circle id="Ellipse_3" data-name="Ellipse 3" cx="2.5" cy="2.5" r="2.5" transform="translate(462 97)" fill="#fff"/>
                                <circle id="Ellipse_4" data-name="Ellipse 4" cx="2.5" cy="2.5" r="2.5" transform="translate(470 97)" fill="#fff"/>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            <div className="userlist__buttons">
                <div className="userlist__buttons__userbutton">
                    {Users.users.map(user => (
                        <button
                            key={user.id}
                            className={`${active == user}`}
                            onClick={() => setActive(user)}
                        >
                            {user.name}
                        </button>
                    ))}
                </div>
                <button className={"userlist__buttons--restart"}>
                    Restart server
                </button>
            </div>
        </section>
    )
}
export default UserList