import React, {useState} from "react";
import Users from "../../../users.json";

export default function UserButton() {
    const [active, setActive] = useState();
    return (
        <div>
            {Users.users.map((user) => (
                <button
                    key={user.id}
                    className={`${active == user  && 'active'}`}
                    onClick={() => setActive(user)}>
                    {user.name}
                </button>
            ))}
        </div>
    )
}