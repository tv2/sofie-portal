import React from "react";
import {User} from "../../models/user";
import CloneUserAccess from "../clone-user-access/clone-user-access";
import UserInformation from "../user-information/user-information";
import AccessRights from "../access-rights/access-rights";
import "./user-details.scss";

interface UserDetailsProps {
    selectedUser: User;
}
export default function UserDetails({ users, selectedUser }: UserDetailsProps) {
    const user = users.find(u => u.id === selectedUser.id);
    return (
        <section className="c-user-details">
            <div className="c-user-details__header">
                <h2>User details</h2>
                <CloneUserAccess />
            </div>
                <div>
                    {user &&
                        <>
                            <UserInformation user={user} key={user.id} />
                            <AccessRights />
                        </>
                    }
                </div>
        </section>
    )
}