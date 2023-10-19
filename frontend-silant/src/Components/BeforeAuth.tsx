import * as React from "react";
import styles from '../Styles/BeforeAuth.module.scss'
import TableBeforeAuth from "./TableBeforeAuth";
import {useEffect, useState} from "react";
import {getMachine} from "./AppService";
import {Simulate} from "react-dom/test-utils";
import mouseUp = Simulate.mouseUp;
import MachineBeforeAuth from "./MachineBeforeAuth";

export default function BeforeAuth() {

    let [machine, setMachine] = useState([])
    let [inputValue, setInputValue] = useState('')

    const handleChange = () => {
        let value = $('#input').val();
        setInputValue(String(value));
    }

    const getDate = () => {
        getMachine(inputValue).then(res => {
            setMachine(res.data)
            $('#input').val('')
            setInputValue('')
        })
    }

    return (
        <main className={styles.main}>
            <h3 className={styles.h3}>Проверьте комплектацию и технические характеристики техники Силант</h3>
            <section className={styles.inputSection}>
                <input className={styles.inputNumber}
                       id='input'
                       placeholder={'Заводской номер техники'}
                       onChange={handleChange}
                />
                <button className={styles.btnSearch} onClick={getDate}>Поиск</button>
            </section>

            <p className={styles.p}>Результаты поиска:</p>
            <p className={styles.p}>Информация окомплектации и технических характеристиках Вашей техники</p>
            <TableBeforeAuth machine={machine}/>


        </main>
    )
}