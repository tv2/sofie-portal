import {User} from '../../models/user'
import './user-information.scss'

interface UserInformationProps {
    user: User
}

export default function UserInformation({ user }: UserInformationProps) {
  return (
    <div className="c-user-information">
      <h3>User information</h3>
      <div className="c-user-information__items">
        <div className="c-user-information__item">
          <label id="ID">ID:</label>
          <input aria-labelledby="ID" type="text" defaultValue={user.id}/>
        </div>
        <div className="c-user-information__item">
          <label id="Label">Label:</label>
          <input aria-labelledby="Label" type="text" defaultValue={user.name}/>
        </div>
        <div className="c-user-information__item">
          <label id="EmberTarget">Ember Target:</label>
          <input aria-labelledby="EmberTarget" type="text" defaultValue={user.emberTarget}/>
        </div>
      </div>
    </div>
  )
}