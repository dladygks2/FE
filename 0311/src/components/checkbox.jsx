import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from './checkbox.module.css';

function Checkbox({children, checked, ...rest }){
    return(
    <div className={styles.checkbox}>
        <label>
            <input type="checkbox" checked={checked} {...rest}/>
            <div>{checked ? (<MdCheckBox className={styles.checked}/>) : (<MdCheckBoxOutlineBlank/>)}</div>
        </label>                    
       <span>{children}</span>
    </div>
    )
}

export default Checkbox;