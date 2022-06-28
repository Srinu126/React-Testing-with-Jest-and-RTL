import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        No ice cream will actually be delivered
      </Popover.Body>
    </Popover>
  );
class Form extends React.Component {
  state = { checked: false };
  handleChange = (e) => {
    this.setState({ checked: e.target.checked });
  };
  render() {
    return (
      <div>
        <form>
          <input
            onChange={this.handleChange}
            type="checkbox"
            name="checkbox1"
            id="disable-button-checkbox"
            checked={this.state.checked}
          />
          <label htmlFor="disable-button-checkbox">
            I agree to{" "}
            <OverlayTrigger placement="right" overlay={popover}>
            <span style={{ color: "blue" }}>terms and conditions</span>
            </OverlayTrigger>
          </label>
          <br />
          <button disabled={!this.state.checked}>Submit Order</button>
        </form>
      </div>
    );
  }
}
export default Form;
