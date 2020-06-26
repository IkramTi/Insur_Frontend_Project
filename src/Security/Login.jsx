import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import {
	Input, InputGroup, InputGroupAddon, InputGroupText,
	Card, CardBody, CardGroup,
	Container, Form, Row, Col,
	Button,
} from 'reactstrap';
import { Account_service } from '../../services/Security';

class Login extends Component {
	state = {
		username: '',
		password: '',
		grant_type: 'password'
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.signIn(this.state);
	}

	render() {
		if (this.props.isLogged) {
			return <Redirect to='/home' />;
		}

		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="8">
							<CardGroup>
								<Card className="p-4">
									<CardBody>
										<Form onSubmit={this.handleSubmit}>
											<h1>Login</h1>
											<p className="text-muted">Sign In to your account</p>
											<InputGroup className="mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-user"></i>
													</InputGroupText>
												</InputGroupAddon>
												<Input
													value={this.state.username}
													onChange={this.handleChange}
													name="username"
													type="text"
													placeholder="Username"
													autoComplete="username" />
											</InputGroup>
											<InputGroup className="mb-4">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-lock"></i>
													</InputGroupText>
												</InputGroupAddon>
												<Input
													value={this.state.password}
													onChange={this.handleChange}
													name="password"
													type="password"
													placeholder="Password"
													autoComplete="current-password" />
											</InputGroup>
											<Row>
												<Col xs="6">
													<Button color="primary" className="px-4">Login</Button>
												</Col>
												<Col xs="6" className="text-right">
													<Button color="link" className="px-0">Forgot password?</Button>
												</Col>
											</Row>
										</Form>
									</CardBody>
								</Card><Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
									<CardBody className="text-center">
										<div>
											<h2>YULZ</h2>
											<p>SAHAM INSURANCE SYSTEM</p>
										</div>
									</CardBody>
								</Card>
							</CardGroup>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isLogged: state.userInfo.token ? true : false
})

export default connect(mapStateToProps, { signIn: Account_service.signIn })(Login)
