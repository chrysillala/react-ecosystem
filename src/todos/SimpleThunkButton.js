import React from 'react';

import { connect } from "react-redux";
import { displayAlert } from "./thunks";

const SimpleThunkButton = ({ onAlertClicked }) => (
  <button onClick={() => onAlertClicked('hello thunk')}>click for alert</button>
)

const mapDispatchToProps = dispatch => ({
  onAlertClicked: text => dispatch(displayAlert(text)),
});

export default connect(null, mapDispatchToProps)(SimpleThunkButton);