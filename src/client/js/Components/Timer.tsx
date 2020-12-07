import React, {useState, useEffect} from "react";

function Timer(props) {
    // Creates loop and removes it when component is no longer used

    useEffect(() => {
        const timer = setTimeout(() => {
            props.setVal(--props.val);
            if(props.val <= 0) {
                props.onFinish();
            }
        }, 1000);
        return () => clearTimeout(timer);
    });

    return <>
        {props.val}
    </>
}

export default Timer;