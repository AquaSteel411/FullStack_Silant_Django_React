import axios from "axios";
const API_URL = 'http://127.0.0.1:8000';

export const getMachine = (serialNumber) => {
    const url = `${API_URL}/machine_search/${serialNumber}`
    return axios.get(url).then(res => res)
}

export const getMachinesUser = (username) => {
    const url = `${API_URL}/machines_user/${username}`
    return axios.get(url).then(res => res)
}

export const getMaintenanceUser = (username) => {
    const url = `${API_URL}/maintenance/${username}`
    return axios.get(url).then(res => res)
}

export const getComplaintsUser = (username) => {
    const url = `${API_URL}/complaint/${username}`
    return axios.get(url).then(res => res)
}

export const getMachineDetail = (serial_number) => {
    const url = `${API_URL}/machine_detail/${serial_number}`
    return axios.get(url).then(res => res)
}

export const getMachineModel = () => {
    const url = `${API_URL}/machine_model/`
    return axios.get(url).then(res => res)
}

export const getEngineModel = () => {
    const url = `${API_URL}/engine_model/`
    return axios.get(url).then(res => res)
}

export const getTransmissionModel = () => {
    const url = `${API_URL}/transmission_model/`
    return axios.get(url).then(res => res)
}

export const getDrivingBridgeModel = () => {
    const url = `${API_URL}/driving_bridge_model/`
    return axios.get(url).then(res => res)
}

export const getControlledBridgeModel = () => {
    const url = `${API_URL}/controlled_bridge_model/`
    return axios.get(url).then(res => res)
}

export const getMaintenanceType = () => {
    const url = `${API_URL}/maintenance_type/`
    return axios.get(url).then(res => res)
}

export const getDefectNode = () => {
    const url = `${API_URL}/defect_node/`
    return axios.get(url).then(res => res)
}

export const getRecoveryType = () => {
    const url = `${API_URL}/recovery_type/`
    return axios.get(url).then(res => res)
}

export const getServiceUsers = () => {
    const url = `${API_URL}/api_user/get_service`
    return axios.get(url).then(res => res)
}

export const getClientUsers = () => {
    const url = `${API_URL}/api_user/get_client`
    return axios.get(url).then(res => res)
}