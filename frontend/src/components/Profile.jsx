import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../auth/Auth0Provider';

const Profile = () => {
  const { loading, user, logout } = useAuth0();
  console.log(user);
  if (loading || !user) {
    return null;
  }

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        <img
          height="40"
          alt="profile"
          src={user.picture}
          className="image-fluid mr-1"
        />
        {user.nickname}
      </DropdownToggle>

      <DropdownMenu right>
        <DropdownItem onClick={() => logout()}>
          <Link to="/propose">
            <i className="fas fa-plus" /> New Proposal
          </Link>
        </DropdownItem>
        <DropdownItem onClick={() => logout()}>
          <i className="fas fa-sign-out-alt" /> Log out
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Profile;
