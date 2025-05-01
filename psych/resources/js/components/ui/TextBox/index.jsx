import * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./TextBox.module.css";

const TextBox = ({ className, ...props }) => {
    return <textarea 
    className={styles.input} 
    {...props}
/>
        };

export default TextBox;

