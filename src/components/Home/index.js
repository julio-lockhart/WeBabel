import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

// Component
import SignOutButton from '../Registrations/SignOut';
import withAuthorization from '../Session/withAuthorization';

// Firebase
import * as routes from '../../constants/routes';
import { db } from '../../firebase';

// ChatKit
import { ChatManager, TokenProvider } from 'pusher-chatkit-client';

// Utils
import { INSTANCE_LOCATOR, TOKEN_PROVIDER_URL } from '../../constants/constants';
import { tokenProviderInstance } from '../../constants/apiInstance';

class HomePage extends Component {
	constructor(props) {
		super(props);

		console.log('Props', props);

		this.state = {
			users: {},
			authUser: this.props.authUser
		};
	}

	componentDidMount() {
		const { onSetUsers } = this.props;

		db.onceGetUsers().then(snapshot =>
			onSetUsers(snapshot.val())
		);

		this.initializeChatKit();
	}

	initializeChatKit = async () => {
		try {
			const chatManager = new ChatManager({
				instanceLocator: INSTANCE_LOCATOR,
				userId: this.state.authUser.uid,
				tokenProvider: new TokenProvider({
					url: TOKEN_PROVIDER_URL
				})
			}).connect({
				delegate: {},
				onSuccess: (cUser) => {
					let currentUser = cUser;
					console.log("Successful connection", currentUser);
				},
				onError: (error) => {
					console.log('Error on connection: ', error);
				}
			});
		} catch (e) {
			console.log("Token Error:", e);
		}
	};

	render() {
		const { users } = this.props;

		return (
			<div>
				<h1>Home</h1>
				<p>The Home Page is accessible by every signed in user.</p>
				<ul>
					<li><Link to={routes.HOME}>Home</Link></li>
					<li><Link to={routes.ACCOUNT}>Account</Link></li>
					<li><SignOutButton /></li>
				</ul>

				{!!users && <UserList users={users} />}
			</div>
		);
	}
}

const UserList = ({ users }) =>
	<div>
		<h2>List of Usernames of Users</h2>
		<p>(Saved on Sign Up in Firebase Database)</p>

		{Object.keys(users).map(key =>
			<div key={key}>{users[key].username}</div>
		)}
	</div>

const mapStateToProps = (state) => ({
	users: state.userState.users,
	authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({
	onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
	withAuthorization(authCondition),
	connect(mapStateToProps, mapDispatchToProps)
)(HomePage);