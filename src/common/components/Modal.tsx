import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export default class Modal extends React.Component<{
	width: string;
	zIndex?: number;
	closeOnClickOutside?: boolean;
}> {
	state = {
		display: 'none'
	};

	constructor(props: any) {
		super(props);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	show() {
		this.setState((prev) => ({ ...prev, display: 'flex' }));
	}

	hide() {
		this.setState((prev) => ({ ...prev, display: 'none' }));
	}

	render() {
		return (
			<_Modal
				style={{
					display: this.state.display,
					...this.props.zIndex ? { zIndex: this.props.zIndex } : {}
				}}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (this.props.closeOnClickOutside) this.hide();
				}}
			>
				<div style={{ width: '100%' }}>
					<div
						className="shadow"
						style={{
							width: this.props.width,
							height: 'fit-content',
							backgroundColor: '#ffffff',
							// borderRadius: '0.5em',
							position: 'relative',
							padding: '1em',
							marginTop: window.innerHeight * 0.1,
							marginLeft: 'auto',
							marginRight: 'auto',
							marginBottom: window.innerHeight * 0.1
						}}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<div
							className={'close-x'}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								this.hide();
							}}
						>
							<a>×</a>
						</div>
						{this.props.children}
					</div>
				</div>
			</_Modal>
		);
	}

	private static nextId = 0;

	static show(elem: React.ReactNode, width: string, zIndex?: number, closeOnClickOutside?: boolean): () => void {
		Modal.nextId++;
		const d = window.document;
		let div: HTMLDivElement | null = d.getElementById(
			'fc-modal-yndhsjfcuh' + Modal.nextId
		) as HTMLDivElement | null;
		if (!div) {
			div = d.createElement('div');
			div.id = 'fc-modal-yndhsjfcuh' + Modal.nextId;
			d.getElementsByTagName('body')[0].appendChild(div);
		}
		const self = this as any;
		ReactDOM.render(
			<Modal
				width={width}
				ref={(r) => (self.modal = r)}
				zIndex={zIndex}
				closeOnClickOutside={closeOnClickOutside}
			>
				{elem}
			</Modal>,
			div,
			() => {
				self.modal.show();
			}
		);
		return () => {
			self.modal && self.modal.hide();
			setTimeout(() => {
				ReactDOM.unmountComponentAtNode(div!);
				setTimeout(() => {
					div!.parentElement!.removeChild(div!);
				}, 300);
			}, 300);
		};
	}
}

const _Modal = styled.div`
	overflow: auto;
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	background-color: rgba(0, 0, 0, 0.5);

	.shadow {
		-moz-box-shadow: 0px 0px 20px #333333;
		-webkit-box-shadow: 0px 0px 20px #333333;
		box-shadow: 0px 0px 20px #333333;
	}

	.close-x {
		position: absolute;
		right: 0;
		top: 0;
		width: 30px;
		height: 30px;
		color: #aaaaaa;
		font-size: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100000000;
	}
`;
