import {User} from '../../models/user'
import './user-information.scss'

interface UserInformationProps {
    user: User;
    disabled: boolean
}

export default function UserInformation({ user, disabled }: UserInformationProps) {
  return (
    <div className="c-user-information">
      <h3>User information</h3>
      <div className="c-user-information__items">
        <div className="c-user-information__item">
          <label id="ID">ID:</label>
          <input aria-labelledby="ID" type="text" defaultValue={user.id} disabled={disabled}/>
        </div>
        <div className="c-user-information__item">
          <label id="Label">Label:</label>
          <input aria-labelledby="Label" type="text" defaultValue={user.name} disabled={disabled}/>
        </div>
        <div className="c-user-information__item">
          <label id="EmberTarget">Ember Target:</label>
          <input aria-labelledby="EmberTarget" type="text" defaultValue={user.emberTarget} disabled={disabled}/>
        </div>
      </div>
    </div>
  )
}