import * as React from "react";
import {getMachineDetail} from "./AppService";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from '../Styles/MachineDetail.module.scss';


export default function MachineDetail() {

    type Machine = {
        serial_number_model: string,
        machine_model: string,
        machine_description: string,
        engine_model: string,
        engine_description: string,
        engine_serial_number: string,
        transmission_model: string,
        transmission_description: string,
        transmission_serial_number: string,
        driving_bridge_model: string,
        driving_bridge_description: string,
        driving_bridge_serial_number: string,
        controlled_bridge_model: string,
        controlled_bridge_description: string,
        controlled_bridge_serial_number: string,
        contract: string,
        ship_date: string,
        recipient: string,
        address: string,
        equipment: string,
        client: string,
        service: string,
    }

    const [machine, setMachine] = useState<Machine>()

    const params = useParams()
    const serialNum = params.serialNumber

    useEffect(() => {
        getMachineDetail(serialNum)
            .then(res => {
                setMachine(res.data)
                console.log(res.data)
            })
    }, [])

    return (
        <main>
            <h3 className={styles.h3}>Детальное описание выбранной техники</h3>
            {!machine?
                <h3 className={styles.h3}>Загрузка...</h3>
                :
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <th>Заводской номер машины</th>
                        <td>{machine.serial_number_model}</td>
                    </tr>
                    <tr>
                        <th>Модель машины</th>
                        <td>{machine.machine_model}</td>
                    </tr>
                    <tr>
                        <th>Описание модели машины</th>
                        <td>{machine.machine_description}</td>
                    </tr>
                    <tr>
                        <th>Модель двигателя</th>
                        <td>{machine.engine_model}</td>
                    </tr>
                    <tr>
                        <th>Описание модели двигателя</th>
                        <td>{machine.engine_description}</td>
                    </tr>
                    <tr>
                        <th>Заводской номер двигателя</th>
                        <td>{machine.engine_serial_number}</td>
                    </tr>
                    <tr>
                        <th>Модель трансмиссии</th>
                        <td>{machine.transmission_model}</td>
                    </tr>
                    <tr>
                        <th>Описание модели трансмиссии</th>
                        <td>{machine.transmission_description}</td>
                    </tr>
                    <tr>
                        <th>Заводской номер трансмиссии</th>
                        <td>{machine.transmission_serial_number}</td>
                    </tr>
                    <tr>
                        <th>Модель ведущего моста</th>
                        <td>{machine.driving_bridge_model}</td>
                    </tr>
                    <tr>
                        <th>Описание модели ведущего моста</th>
                        <td>{machine.driving_bridge_description}</td>
                    </tr>
                    <tr>
                        <th>Заводской номер ведущего моста</th>
                        <td>{machine.driving_bridge_serial_number}</td>
                    </tr>
                    <tr>
                        <th>Модель управляемого моста</th>
                        <td>{machine.controlled_bridge_model}</td>
                    </tr>
                    <tr>
                        <th>Описание модели управляемого моста</th>
                        <td>{machine.controlled_bridge_description}</td>
                    </tr>
                    <tr>
                        <th>Заводской номер управляемого моста</th>
                        <td>{machine.controlled_bridge_serial_number}</td>
                    </tr>
                    <tr>
                        <th>Договор</th>
                        <td>{machine.contract}</td>
                    </tr>
                    <tr>
                        <th>Дата отгрузки с завода</th>
                        <td>{machine.ship_date}</td>
                    </tr>
                    <tr>
                        <th>Получатель</th>
                        <td>{machine.recipient}</td>
                    </tr>
                    <tr>
                        <th>Адрес доставки</th>
                        <td>{machine.address}</td>
                    </tr>
                    <tr>
                        <th>Комплектация</th>
                        <td>{machine.equipment}</td>
                    </tr>
                    <tr>
                        <th>Клиент</th>
                        <td>{machine.client}</td>
                    </tr>
                    <tr>
                        <th>Сервисная компания</th>
                        <td>{machine.service}</td>
                    </tr>
                    </tbody>
                </table>
            }
        </main>
    )
}