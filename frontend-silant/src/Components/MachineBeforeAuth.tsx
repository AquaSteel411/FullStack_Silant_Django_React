import * as React from "react";


export default function MachineBeforeAuth(props) {
    return (
        <tr>
            <td>{props.serial_number_model}</td>
            <td>{props.machine_model}</td>
            <td>{props.engine_model}</td>
            <td>{props.engine_serial_number}</td>
            <td>{props.transmission_model}</td>
            <td>{props.transmission_serial_number}</td>
            <td>{props.driving_bridge_model}</td>
            <td>{props.driving_bridge_serial_number}</td>
            <td>{props.controlled_bridge_model}</td>
            <td>{props.controlled_bridge_serial_number}</td>
        </tr>
    )
}