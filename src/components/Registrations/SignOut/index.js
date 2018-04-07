import React from 'react';

import { NavLink } from 'reactstrap';
import { auth } from '../../../firebase';

const SignOutButton = () =>
  <NavLink
    onClick={auth.doSignOut}>Log Out</NavLink>

export default SignOutButton;
