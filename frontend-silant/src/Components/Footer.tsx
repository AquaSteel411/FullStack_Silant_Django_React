import * as React from "react";
import styles from '../Styles/Footer.module.scss'


export default function Footer() {

    return (
        <footer className={styles.footer}>
            <span className={styles.leftText}>+7-8352-20-12-09, telegram</span>
            <span className={styles.rightText}>Мой Силант, 2023 г.</span>
        </footer>
    )
}