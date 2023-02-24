import React from "react";
import {User} from "../../models/user";
import "./user-information.scss";

interface UserInformationProps {
    user: User
}

export default function UserInformation({ user }: UserInformationProps) {
    return (
        <div className="c-user-information">
            <h3>User information</h3>
            <div className="c-user-information__items">
                <div className="c-user-information__item">
                    <label>User ID:</label>
                    <input type="text" defaultValue={user.id}/>
                </div>
                <div className="c-user-information__item">
                    <label>User Label:</label>
                    <input type="text" defaultValue={user.name}/>
                </div>
                <div className="c-user-information__item">
                    <label>Ember Target:</label>
                    <input type="text" defaultValue={user.target}/>
                </div>
            </div>
        </div>
    )
}