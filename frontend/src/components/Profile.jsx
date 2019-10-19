import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import React from 'react';
import { useAuth0 } from '../auth/react-auth0-spa';

const Profile = () => {
  const { loading, user, logout } = useAuth0();
  console.log(user);
  if (loading || !user) {
    return null;
  }

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        <img src={user.picture} height="40" className="image-fluid mr-1" />
        {user.nickname}
      </DropdownToggle>

      <DropdownMenu right>
        <DropdownItem onClick={() => logout()}>
          <i className="fas fa-sign-out-alt" /> Log out
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Profile;
