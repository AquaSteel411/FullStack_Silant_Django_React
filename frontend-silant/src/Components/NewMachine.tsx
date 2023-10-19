import * as React from "react";
import {useEffect, useState} from "react";
import {
    getClientUsers,
    getControlledBridgeModel,
    getDrivingBridgeModel,
    getEngineModel,
    getMachineModel,
    getServiceUsers,
    getTransmissionModel
} from "./AppService";
import axios from "axios";
import styles from '../Styles/NewMachine.module.scss';
import {useNavigate} from "react-router-dom";


export default function NewMachine({username, groupUser}) {

    const [machineModel, setMachineModel] = useState([])
    const [engineModel, setEngineModel] = useState([])
    const [transmissionModel, setTransmissionModel] = useState([])
    const [drivingBridgeModel, setDrivingBridgeModel] = useState([])
    const [controlledBridgeModel, setControlledBridgeModel] = useState([])
    const [clientUsers, setClientUsers] = useState([])
    const [serviceUsers, setServiceUsers] = useState([])

    const [selectedMachineModel, setSelectedMachineModel] = useState('')
    const [selectedEngineModel, setSelectedEngineModel] = useState('')
    const [selectedTransmissionModel, setSelectedTransmissionModel] = useState('')
    const [selectedDrivingBridgeModel, setSelectedDrivingBridgeModel] = useState('')
    const [selectedControlledBridgeModel, setSelectedControlledBridgeModel] = useState('')
    const [selectedClientUser, setSelectedClientUser] = useState('')
    const [selectedServiceUser, setSelectedServiceUser] = useState('')

    const [serialNumberModel, setSerialNumberModel] = useState('')
    const [engineSerialNumber, setEngineSerialNumber] = useState('')
    const [transmissionSerialNumber, setTransmissionSerialNumber] = useState('')
    const [drivingBridgeSerialNumber, setDrivingBridgeSerialNumber] = useState('')
    const [controlledBridgeSerialNumber, setControlledBridgeSerialNumber] = useState('')
    const [contract, setContract] = useState('')
    const [shipDate, setShipDate] = useState('')
    const [recipient, setRecipient] = useState('')
    const [address, setAddress] = useState('')
    const [equipment, setEquipment] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            getMachineModel()
                .then(res => {
                    setMachineModel(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getEngineModel()
                .then(res => {
                    setEngineModel(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getTransmissionModel()
                .then(res => {
                    setTransmissionModel(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getDrivingBridgeModel()
                .then(res => {
                    setDrivingBridgeModel(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getControlledBridgeModel()
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getClientUsers()
                .then(res => {
                    setClientUsers(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
            getServiceUsers()
                .then(res => {
                    setServiceUsers(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [username])

    useEffect(() => {
        if (machineModel.length !== 0 && engineModel.length !== 0 && transmissionModel.length !== 0 &&
            drivingBridgeModel.length !== 0 && controlledBridgeModel.length !== 0 &&
            clientUsers.length !== 0 && serviceUsers.length !== 0) {
            setSelectedMachineModel(machineModel[0].name)
            setSelectedEngineModel(engineModel[0].name)
            setSelectedTransmissionModel(transmissionModel[0].name)
            setSelectedDrivingBridgeModel(drivingBridgeModel[0].name)
            setSelectedControlledBridgeModel(controlledBridgeModel[0].name)
            setSelectedClientUser(clientUsers[0].first_name)
            setSelectedServiceUser(serviceUsers[0].first_name)

        }
    }, [
        machineModel, engineModel, transmissionModel, drivingBridgeModel,
        controlledBridgeModel, clientUsers, serviceUsers, username
    ])

    const submitHandler = () => {
        axios(
            'http://127.0.0.1:8000/add_machine/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                data: {
                    serial_number_model: serialNumberModel,
                    machine_model: selectedMachineModel,
                    engine_model: selectedEngineModel,
                    engine_serial_number: engineSerialNumber,
                    transmission_model: selectedTransmissionModel,
                    transmission_serial_number: transmissionSerialNumber,
                    driving_bridge_model: selectedDrivingBridgeModel,
                    driving_bridge_serial_number: drivingBridgeSerialNumber,
                    controlled_bridge_model: selectedControlledBridgeModel,
                    controlled_bridge_serial_number: controlledBridgeSerialNumber,
                    contract: contract,
                    ship_date: shipDate,
                    recipient: recipient,
                    address: address,
                    equipment: equipment,
                    client: selectedClientUser,
                    service: selectedServiceUser,
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
                        <label className={styles.label}>Заводской номер техники:</label>
                        <input className={styles.input} value={serialNumberModel}
                               onChange={e => setSerialNumberModel(e.target.value)}/>

                        <label className={styles.label}>Модель техники:</label>
                        <select className={styles.select} value={selectedMachineModel}
                                onChange={e => setSelectedMachineModel(e.target.value)}>
                            {(machineModel.length === 0)?
                                <></>
                                :
                                machineModel.map((el, index) => <option key={index}>{el.name}</option>)
                            }
                        </select>

                        <label className={styles.label}>Модель двигателя:</label>
                        <select className={styles.select} value={selectedEngineModel}
                                onChange={e => setSelectedEngineModel(e.target.value)}>
                            {(engineModel.length === 0)?
                                <></>
                                :
                                engineModel.map((el, index) => <option key={index}>{el.name}</option>)
                            }
                        </select>

                        <label className={styles.label}>Заводской номер двигателя:</label>
                        <input className={styles.input} value={engineSerialNumber}
                               onChange={e => setEngineSerialNumber(e.target.value)} />

                        <label className={styles.label}>Модель трансмиссии:</label>
                        <select className={styles.select} value={selectedTransmissionModel}
                                onChange={e => setSelectedTransmissionModel(e.target.value)}>
                            {(transmissionModel.length === 0)?
                                <></>
                                :
                                transmissionModel.map((el, index) => <option key={index}>{el.name}</option>)
                            }
                        </select>

                        <label className={styles.label}>Заводской номер трансмиссии:</label>
                        <input className={styles.input} value={transmissionSerialNumber}
                               onChange={e => setTransmissionSerialNumber(e.target.value)} />

                        <label className={styles.label}>Модель ведущего моста:</label>
                        <select className={styles.select} value={selectedDrivingBridgeModel}
                                onChange={e => setSelectedDrivingBridgeModel(e.target.value)}>
                            {(drivingBridgeModel.length === 0)?
                                <></>
                                :
                                drivingBridgeModel.map((el, index) => <option key={index}>{el.name}</option>)
                            }
                        </select>

                        <label className={styles.label}>Заводской номер ведущего моста:</label>
                        <input className={styles.input} value={drivingBridgeSerialNumber}
                               onChange={e => setDrivingBridgeSerialNumber(e.target.value)} />

                        <label className={styles.label}>Модель ведущего моста:</label>
                        <select className={styles.select} value={selectedControlledBridgeModel}
                                onChange={e => setSelectedControlledBridgeModel(e.target.value)}>
                            {(controlledBridgeModel.length === 0)?
                                <></>
                                :
                                controlledBridgeModel.map((el, index) => <option key={index}>{el.name}</option>)
                            }
                        </select>

                        <label className={styles.label}>Заводской номер управляемого моста:</label>
                        <input className={styles.input} value={controlledBridgeSerialNumber}
                               onChange={e => setControlledBridgeSerialNumber(e.target.value)}/>

                        <label className={styles.label}>Договор, дата:</label>
                        <input className={styles.input} value={contract}
                               onChange={e => setContract(e.target.value)}/>

                        <label className={styles.label}>Дата отгрузки с завода:</label>
                        <input className={styles.input} value={shipDate}
                               placeholder='дд.мм.гггг'
                               onChange={e => setShipDate(e.target.value)} />

                        <label className={styles.label}>Получатель:</label>
                        <input className={styles.input} value={recipient}
                               onChange={e => setRecipient(e.target.value)}/>

                        <label className={styles.label}>Адрес поставки (эксплуатации):</label>
                        <textarea className={styles.textArea} value={address}
                                  onChange={e => setAddress(e.target.value)}/>

                        <label className={styles.label}>Комплектация:</label>
                        <textarea className={styles.textArea} value={equipment}
                                  onChange={e => setEquipment(e.target.value)}/>

                        <label className={styles.label}>Клиент:</label>
                        <select className={styles.select} value={selectedClientUser}
                                onChange={e => setSelectedClientUser(e.target.value)}>
                            {(clientUsers.length === 0)?
                                <></>
                                :
                                clientUsers.map((el, index) => <option key={index}>{el.first_name}</option>)
                            }
                        </select>

                        <label className={styles.label}>Сервисная компания:</label>
                        <select className={styles.select} value={selectedServiceUser}
                                onChange={e => setSelectedServiceUser(e.target.value)}>
                            {(serviceUsers.length === 0)?
                                <></>
                                :
                                serviceUsers.map((el, index) => <option key={index}>{el.first_name}</option>)
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