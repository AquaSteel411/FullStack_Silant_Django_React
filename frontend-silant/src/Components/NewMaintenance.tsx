import * as React from "react";
import {useEffect, useState} from "react";
import {getMachinesUser, getMaintenanceType, getServiceUsers} from "./AppService";
import axios from "axios";
import styles from '../Styles/NewMaintenance.module.scss';
import {useNavigate} from "react-router-dom";


export default function NewMaintenance({username}) {

    const [maintenanceType, setMaintenanceType] = useState([])
    const [machine, setMachine] = useState([])
    const [serviceUsers, setServiceUser] = useState([])
    const [maintenanceDate, setMaintenanceDate] = useState('')
    const [operationTime, setOperationTime] = useState('')
    const [numberOrder, setNumberOrder] = useState('')
    const [dateOrder, setDateOrder] = useState('')
    const [selectedMaintenanceType, setSelectedMaintenanceType] = useState('')
    const [selectedMachine, setSelectedMachine] = useState('')
    const [selectedService, setSelectedService] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            getMachinesUser(username)
                .then(res => {
                    setMachine(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getMaintenanceType()
                .then(res => {
                    setMaintenanceType(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getServiceUsers()
                .then(res => {
                    setServiceUser(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [username])

    useEffect(() => {
        if (maintenanceType.length !== 0 && machine.length !== 0 && serviceUsers.length !== 0) {
            setSelectedMaintenanceType(maintenanceType[0].name)
            setSelectedMachine(machine[0].serial_number_model)
            setSelectedService(serviceUsers[0].first_name)
        }
    }, [maintenanceType, machine, username])

    const submitHandler = () => {
        axios(
            'http://127.0.0.1:8000/add_maintenance/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                data: {
                    machine: selectedMachine,
                    type_maintenance: selectedMaintenanceType,
                    maintenance_date: maintenanceDate,
                    operating_time: operationTime,
                    number_order: numberOrder,
                    date_order: dateOrder,
                    service: selectedService,
                }
            })
            .then(response => {
                if (response) {
                    console.log(response)
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .catch(error => {
                console.log(error)
            })
        navigate('/')
    }

    return (
        <>
            {!username?
                <h3 className={styles.h3}>Нет доступа к данной странице. Авторизуйтесь</h3>
                :
                <main className={styles.main}>
                    <section className={styles.section}>
                        <label className={styles.label}>Заводской номер техники:</label>
                        <select className={styles.select} value={selectedMachine}
                                onChange={e => setSelectedMachine(e.target.value)}>
                            {(machine.length === 0)?
                                <></>
                                :
                                machine.map((el, index) => <option key={index}>{el.serial_number_model}</option>)
                            }
                        </select>

                        <label className={styles.label}>Тип ТО:</label>
                        <select className={styles.select} value={selectedMaintenanceType}
                                onChange={e => setSelectedMaintenanceType(e.target.value)}>
                            {(maintenanceType.length === 0)?
                                <></>
                                :
                                maintenanceType.map((el, index) => <option key={index}>{el.name}</option>)
                            }
                        </select>

                        <label className={styles.label}>Дата ТО:</label>
                        <input className={styles.input} value={maintenanceDate}
                               placeholder='дд.мм.гггг'
                               onChange={e => setMaintenanceDate(e.target.value)} />

                        <label className={styles.label}>Наработка м/час:</label>
                        <input className={styles.input} value={operationTime}
                               onChange={e => setOperationTime(e.target.value)} />

                        <label className={styles.label}>Заказ-наряд, №</label>
                        <input className={styles.input} value={numberOrder}
                               onChange={e => setNumberOrder(e.target.value)} />

                        <label className={styles.label}>Дата заказ-наряда:</label>
                        <input className={styles.input} value={dateOrder}
                               placeholder='дд.мм.гггг'
                               onChange={e => setDateOrder(e.target.value)} />

                        <label className={styles.label}>Сервисная компания:</label>
                        <select className={styles.select} value={selectedService}
                                onChange={e => setSelectedService(e.target.value)}>
                            {(maintenanceType.length === 0)?
                                <></>
                                :
                                serviceUsers.map((el, index) => <option key={index}>{el.first_name}</option>)
                            }
                        </select>

                        <button className={styles.btnCreate} onClick={submitHandler}>Создать</button>

                    </section>
                </main>
            }
        </>
    )
}