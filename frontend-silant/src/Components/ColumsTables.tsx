export const columnsMainTable = [
    {
        Header: 'Зав. № машины',
        accessor: 'serial_number_model',
    },
    {
        Header: 'Модель техники',
        accessor: 'machine_model',
    },
    {
        Header: 'Модель двигателя',
        accessor: 'engine_model',
    },
    {
        Header: 'Зав. № двигателя',
        accessor: 'engine_serial_number',
    },
    {
        Header: 'Модель трансмиссии',
        accessor: 'transmission_model',
    },
    {
        Header: 'Зав. № трансмиссии',
        accessor: 'transmission_serial_number',
    },
    {
        Header: 'Модель ведушего моста',
        accessor: 'driving_bridge_model',
    },
    {
        Header: 'Зав. № ведущего моста',
        accessor: 'driving_bridge_serial_number',
    },
    {
        Header: 'Модель управляемого моста',
        accessor: 'controlled_bridge_model',
    },
    {
        Header: 'Зав. № управляемого моста',
        accessor: 'controlled_bridge_serial_number',
    },
    {
        Header: 'Контракт',
        accessor: 'contract',
    },
    {
        Header: 'Дата отгрузки',
        accessor: 'ship_date',
    },
    {
        Header: 'Получатель',
        accessor: 'recipient',
    },
    {
        Header: 'Адрес',
        accessor: 'address',
    },
    {
        Header: 'Комплектация',
        accessor: 'equipment',
    },
    {
        Header: 'Клиент',
        accessor: 'client',
    },
    {
        Header: 'Сервисная компания',
        accessor: 'service',
    },
];

export const initialStateMainTable = {
    sortBy: [
        {
            id: "ship_date",
            desc: false
        }
    ],
    filters: [
        {
            id: "status",
            value: "single"
        }
    ]
};

export const columnsMaintenanceTable = [
    {
        Header: 'Машина',
        accessor: 'machine',
    },
    {
        Header: 'Тип ТО',
        accessor: 'type_maintenance',
    },
    {
        Header: 'Дата проведения ТО',
        accessor: 'maintenance_date',
    },
    {
        Header: 'Время наработки',
        accessor: 'operating_time',
    },
    {
        Header: '№ заказ-наряда',
        accessor: 'number_order',
    },
    {
        Header: 'Дата заказ-наряда',
        accessor: 'date_order',
    },
    {
        Header: 'Зав. № трансмиссии',
        accessor: 'service',
    },
];

export const initialStateMaintenanceTable = {
    sortBy: [
        {
            id: "maintenance_date",
            desc: false
        }
    ],
    filters: [
        {
            id: "status",
            value: "single"
        }
    ]
};

export const columnsComplaintTable = [
    {
        Header: 'Дата отказа',
        accessor: 'date_defect',
    },
    {
        Header: 'Наработка, м/час',
        accessor: 'operating_time',
    },
    {
        Header: 'Узел отказа',
        accessor: 'defect_node',
    },
    {
        Header: 'Описание отказа',
        accessor: 'description',
    },
    {
        Header: 'Способ восстановления',
        accessor: 'recovery',
    },
    {
        Header: 'Используемые запасные части',
        accessor: 'spare_parts',
    },
    {
        Header: 'Дата восстановления',
        accessor: 'date_recovery',
    },
    {
        Header: 'Время простоя техники',
        accessor: 'downtime',
    },
    {
        Header: 'Mашина',
        accessor: 'machine',
    },
    {
        Header: 'Cервисная компания',
        accessor: 'service',
    },
];

export const initialStateComplaintTable = {
    sortBy: [
        {
            id: "date_defect",
            desc: false
        }
    ],
    filters: [
        {
            id: "status",
            value: "single"
        }
    ]
};

