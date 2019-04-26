import * as React from 'react'; 
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export default class Modal extends React.Component<{
  width: string;
  height?: string;
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
        style={{ display: this.state.display }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          this.hide();
        }}
      >
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
      </_Modal>
    );
  }

  static show(
    elem: React.ReactNode,
    width: string,
    height: string = ''
  ): () => void {
    const d = window.document;
    let div: HTMLDivElement | null = d.getElementById(
      'fc-modal-duwnyhc7837rnnne47yt4e7v578geidc4785'
    ) as HTMLDivElement | null;
    if (!div) {
      div = d.createElement('div');
      div.id = 'fc-modal-duwnyhc7837rnnne47yt4e7v578geidc4785';
      d.getElementsByTagName('body')[0].appendChild(div);
    }
    const self = this as any;
    const modalElem = (
      <Modal width={width} height={height} ref={(r) => (self.modal = r)}>
        {elem}
      </Modal>
    );
    ReactDOM.render(modalElem, div, () => {
      self.modal.show();
    });
    return () => {
      self.modal.hide();
      ReactDOM.unmountComponentAtNode(self.modal);
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
  z-index: 1000000;
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
`