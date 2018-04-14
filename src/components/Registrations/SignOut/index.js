import React from 'react';

import { ListGroupItem } from 'reactstrap';
import { auth } from '../../../firebase';

const SignOutButton = () =>
   <ListGroupItem
      className="text-center"
      color="danger"
      onClick={auth.doSignOut}>Log Out</ListGroupItem>

export default SignOutButton;
