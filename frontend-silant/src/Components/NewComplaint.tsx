import * as React from "react";
import {useEffect, useState} from "react";
import {getDefectNode, getMachinesUser, getRecoveryType, getServiceUsers} from "./AppService";
import axios from "axios";
import styles from "../Styles/NewComplaint.module.scss";
import {useNavigate} from "react-router-dom";


export default function NewComplaint({username, groupUser}) {

    const [defectNode, setDefectNode] = useState([])
    const [recoveryType, setRecoveryType] = useState([])
    const [machine, setMachine] = useState([])
    const [defectDate, setDefectDate] = useState('')
    const [operationTime, setOperationTime] = useState('')
    const [selectedDefectNode, setSelectedDefectNode] = useState('')
    const [descriptionDefect, setDescriptionDefect] = useState('')
    const [selectedRecoveryType, setSelectedRecoveryType] = useState('')
    const [spareParts, setSpareParts] = useState('')
    const [recoveryDate, setRecoveryDate] = useState('')
    const [downtime, setDowntime] = useState('')
    const [selectedMachine, setSelectedMachine] = useState('')

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
            getDefectNode()
                .then(res => {
                    setDefectNode(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getRecoveryType()
                .then(res => {
                    setRecoveryType(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }


    }, [username])

    useEffect(() => {
        if (defectNode.length !== 0 && recoveryType.length !== 0 && machine.length !== 0) {
            setSelectedDefectNode(defectNode[0].name)
            setSelectedRecoveryType(recoveryType[0].name)
            setSelectedMachine(machine[0].serial_number_model)
        }
    }, [defectNode, recoveryType, machine])

    const submitHandler = () => {
        axios(
            'http://127.0.0.1:8000/add_complaint/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                data: {
                    date_defect: defectDate,
                    operating_time: operationTime,
                    defect_node: selectedDefectNode,
                    recovery: selectedRecoveryType,
                    description: descriptionDefect,
                    spare_parts: spareParts,
                    date_recovery: recoveryDate,
                    downtime: downtime,
                    machine: selectedMachine,
                    service: username,
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
            {(groupUser === 'Service') || (groupUser === 'Managers') || (groupUser === 'admin')?
                <main className={styles.main}>
                    <section className={styles.section}>
                        <label className={styles.label}>Дата отказа:</label>
                        <input className={styles.input} value={defectDate}
                               placeholder='дд.мм.гггг'
                               onChange={e => setDefectDate(e.target.value)} />

                        <label className={styles.label}>Наработка м/час:</label>
                        <input className={styles.input} value={operationTime}
                               onChange={e => setOperationTime(e.target.value)} />
                        <label className={styles.label}>Узел отказа:</label>

                        <select className={styles.select} value={selectedDefectNode}
                                onChange={e => setSelectedDefectNode(e.target.value)}>
                            {(defectNode.length === 0)?
                                <></>
                                :
                                defectNode.map((el, index) => <option key={index}>{el.name}</option>)
                            }
                        </select>


                        <label className={styles.label}>Описание отказа:</label>
                        <input className={styles.input} type='text' value={descriptionDefect}
                               onChange={e => setDescriptionDefect(e.target.value)}/>
                        <label className={styles.label}>Способ восстановления:</label>
                        <select className={styles.select} value={selectedRecoveryType}
                                onChange={e => setSelectedRecoveryType(e.target.value)}>
                            {(recoveryType.length === 0)?
                                <></>
                                :
                                recoveryType.map((el, index) => <option key={index}>{el.name}</option>)
                            }
                        </select>
                        <label className={styles.label}>Используемые запасные части:</label>
                        <input className={styles.input} type='text' value={spareParts}
                               onChange={e => setSpareParts(e.target.value)}/>
                        <label className={styles.label}>Дата восстановления:</label>
                        <input className={styles.input} value={recoveryDate}
                               placeholder='дд.мм.гггг'
                               onChange={e => setRecoveryDate(e.target.value)} />

                        <label className={styles.label}>Время простоя техники:</label>
                        <input className={styles.input} placeholder='Количество дней' value={downtime}
                               onChange={e => setDowntime(e.target.value)}/>
                        <label className={styles.label}>Заводской номер техники:</label>
                        <select className={styles.select} value={selectedMachine}
                                onChange={e => setSelectedMachine(e.target.value)}>
                            {(machine.length === 0)?
                                <></>
                                :
                                machine.map((el, index) => <option key={index}>{el.serial_number_model}</option>)
                            }
                        </select>
                        <button className={styles.btnCreate} onClick={submitHandler}>Создать</button>
                    </section>
                </main>
                :
                <h3 className={styles.h3}>Нет доступа к данной странице.</h3>
            }
        </>

    )
}