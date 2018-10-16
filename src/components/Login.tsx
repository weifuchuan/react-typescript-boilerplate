import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Login.scss';
import { Input, Button } from 'antd';
import { observable } from 'mobx';

@observer
export default class Login extends Component {
	@observable phone: string;
	@observable password: string;
	onLogin: () => void = () => {
		console.log(this.phone, this.password);
	};
	onPhoneInput: (phone: string) => void = (p) => (this.phone = p);
	onPasswordInput: (ps: string) => void = (p) => (this.password = p);

	render() {
		return (
			<LoginStateless
				phone={this.phone}
				password={this.password}
				onLogin={this.onLogin}
				onPhoneInput={this.onPhoneInput}
				onPasswordInput={this.onPasswordInput}
			/>
		);
	}
}

function LoginStateless({
	phone,
	password,
	onLogin,
	onPhoneInput,
	onPasswordInput
}: {
	phone: string;
	password: string;
	onLogin: () => void;
	onPhoneInput: (phone: string) => void;
	onPasswordInput: (ps: string) => void;
}): JSX.Element {
	return (
		<div className="container">
			<div className="form">
				<Input placeholder="手机" value={phone} onChange={(e) => onPhoneInput((e.target as any).value)} />
				<div style={{ height: '0.6em' }} />
				<Input
					placeholder="密码"
					value={password}
					type={'password'} 
          onChange={(e) => onPasswordInput((e.target as any).value)}
				/>
				<div style={{ height: '0.6em' }} />
				<Button type="primary" onClick={onLogin}>
					登录
				</Button>
			</div>
		</div>
	);
}
