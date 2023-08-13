import React from 'react'
import styles from './button.module.scss'

interface ButtonProps
{
    text: string;
    submit?: boolean;
    classic?: boolean;
    color?: "blue" | "red" | "green" | "purple";
    beforeIndent?: React.ReactNode;
    afterIndent?: React.ReactNode;
}
const Button = ({text,...rest} : ButtonProps) => {

    const {submit,classic,color = "blue",beforeIndent,afterIndent} = rest;

    const colorClassName = `button${color ? `-${color}` : ''}` 

    const className = classic ? styles.button_classic : `${styles[colorClassName]} ${styles.button}`;
    const type = submit ? "submit" : "button";

    return (
        <button type={type} className={className}>
            {beforeIndent}
            {text}
            {afterIndent}
        </button>  
    )
}

export default Button


