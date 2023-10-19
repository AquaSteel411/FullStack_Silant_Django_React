import * as React from "react";
import styles from '../Styles/TableBeforeAuth.module.scss'
import MachineBeforeAuth from "./MachineBeforeAuth";


export default function TableBeforeAuth({machine}) {

    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    <th>Зав. № машины</th>
                    <th>Модель техники</th>
                    <th>Модель двигателя</th>
                    <th>Зав. № двигателя</th>
                    <th>Модель трансмиссии</th>
                    <th>Зав. № трансмиссии</th>
                    <th>Модель ведушего моста</th>
                    <th>Зав. № ведущего моста</th>
                    <th>Модель управляемого моста</th>
                    <th>Зав. № управляемого моста</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {machine.map((el, index) => <MachineBeforeAuth key={index}
                    serial_number_model={el.serial_number_model}
                    machine_model={el.machine_model}
                    engine_model={el.engine_model}
                    engine_serial_number={el.engine_serial_number}
                    transmission_model={el.transmission_model}
                    transmission_serial_number={el.transmission_serial_number}
                    driving_bridge_model={el.driving_bridge_model}
                    driving_bridge_serial_number={el.driving_bridge_serial_number}
                    controlled_bridge_model={el.controlled_bridge_model}
                    controlled_bridge_serial_number={el.controlled_bridge_serial_number}/>)}
            </tbody>
        </table>
    )
}