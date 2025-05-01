import * as React from "react";

import styles from "./Input.module.css";

const Input = ({ className, ...props }) => {
    return <input 
    className={styles.input} 
    {...props}
/>
        };

export default Input;

