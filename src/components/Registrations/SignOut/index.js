import React from 'react';

import { Button } from 'reactstrap';
import { auth } from '../../../firebase';

const SignOutButton = () =>
  <Button
    color="danger"
    size="lg"
    onClick={auth.doSignOut}>Log Out</Button>

export default SignOutButton;
