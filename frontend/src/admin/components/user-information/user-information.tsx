import {User} from '../../models/user'
import './user-information.scss'

interface UserInformationProps {
    user: User;
    disabled: boolean;
    onUserChange: (key: keyof User, value: string) => void;
}

export default function UserInformation({ user, disabled, onUserChange }: UserInformationProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target
        onUserChange(id as keyof User, value)
    }

    return (
        <div className="c-user-information">
            <h3>User information</h3>
            <div className="c-user-information__items">
                <div className="c-user-information__item">
                    <label htmlFor="id">ID:</label>
                    <input
                        id="id"
                        type="text"
                        value={user.id}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                </div>
                <div className="c-user-information__item">
                    <label htmlFor="name">Label:</label>
                    <input
                        id="name"
                        type="text"
                        value={user.name}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                </div>
                <div className="c-user-information__item">
                    <label htmlFor="emberTarget">Ember Target:</label>
                    <input
                        id="emberTarget"
                        type="text"
                        value={user.emberTarget}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
  )
}