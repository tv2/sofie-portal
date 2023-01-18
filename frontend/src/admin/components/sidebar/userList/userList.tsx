import MenuIcon from "./menuIcon";
import UserButton from "./userButton";
import './userlist.scss'

export default function UserList() {
    return (
        <section className={"c-userlist"}>
            <div className="c-userlist__header">
                <h2>Users</h2>
                <button>
                    <MenuIcon/>
                </button>
            </div>
            <div className="c-userlist__buttons">
                <UserButton/>
            </div>
        </section>
    )
}