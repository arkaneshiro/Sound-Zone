import React from 'react';

import styles from '../../styles/LabelButton.module.css';

const LabelButton = ({labelfor, innerhtml}) => {
    return (
        <label className={styles.button} htmlFor={labelfor} >{innerhtml}</label>
    )
}

export default LabelButton;
