import React from 'react';
import styles from './box.module.css';

function Box(){
    return(
    <div>
     <div className={styles.Box}></div>
     <div className={styles.Box02}></div>
    </div>
    )
}

export default Box;