import React, { useState } from 'react'
import styles from './input.module.scss'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
interface InputProps
{
    type: 'text' | 'password' | 'email' | 'date' | 'tel'
    name: string;
    placeholder: string;
    telPattern?: string;
    indentColor?: "blue" | "red" | "green" | "purple";
    beforeIndent?: React.ReactNode;
    afterIndent?: React.ReactNode;
}

const Input = ({type,name,placeholder, ...rest} :InputProps) => {

    const {beforeIndent,afterIndent,indentColor = "black",telPattern} = rest;

    const [showPassword, setShowPassword] = useState(false);

    const indentColorClassName = `input_text-${indentColor}`;

    return (
        <div className={styles.input_group}>
            {
                beforeIndent
            }
                <input
                    pattern={type === 'tel' ? telPattern : undefined}
                    type={showPassword ? "text" : type}
                    name={name}
                    placeholder={placeholder}
                    className={`${styles[indentColorClassName]} ${styles.input_text}` }
                />
            {
                type === "password" ?
                <span className='icon flex items-center px-4' onClick={() => setShowPassword(!showPassword)}>
                    <HiFingerPrint size={20}/>
                </span>
                :
                afterIndent
            }
            
        </div>
    )
}

export default Input