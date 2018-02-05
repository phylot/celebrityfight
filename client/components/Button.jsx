import React from 'react';

function Button(props) { // TODO: Turn in CardButton class + make a ModalButton class also. Could abstract the Button further, then reuse this in both?
	return (
    <button disabled={props.disabled} className={'button' + ( props.info.win ? ' green' : '' ) + '' + ( props.info.lose ? ' red' : '' )} 
    onClick={props.onClick}>
    	{props.info.label}<span>{props.info.value}</span>
    </button>
	);
}

export default Button;