import * as React from "react";
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi';
import {useGlobalFilter, useSortBy, useTable} from 'react-table';
import styles from '../Styles/MaintenanceTable.module.scss';
import {useMemo} from "react";
import {columnsMaintenanceTable, initialStateMaintenanceTable} from "./ColumsTables";
import {GlobalFilterInput} from "./GlobalFilterInput";
import {useNavigate} from "react-router-dom";


export default function MaintenanceReactTable({maintenance}) {

    const columns = useMemo(() => columnsMaintenanceTable, [])
    const data = useMemo(() => maintenance, [])
    const initialState = useMemo(() => initialStateMaintenanceTable, [])
    const navigate = useNavigate();

    const {
        // эти штуки являются обязательными
        getTableProps,
        getTableBodyProps,
        // о том, почему мы используем группы заголовков, а не сами заголовки, поговорим в следующем разделе
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable({ columns, data, initialState }, useGlobalFilter, useSortBy)

    const newMaintenance = (row) => {
        navigate(`/new_maintenance`)
    }

    return (
        <section id='t2' className={styles.section}>
            <section className={styles.manageData}>
                <GlobalFilterInput
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}
                />
                <button className={styles.addMaintenance} onClick={newMaintenance}>Добавить ТО</button>
            </section>


            <table className={styles.table} {...getTableProps()}>
                <thead className={styles.thead}>
                {headerGroups.map((hG) => (
                    <tr {...hG.getHeaderGroupProps()}>
                        {hG.headers.map((col) => (
                            <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                                {col.render('Header')}{' '}
                                {col.canSort && (
                                    <span>
                                    {col.isSorted ? (
                                        col.isSortedDesc ? (
                                            <BiSortUp className={styles.activeSort} />
                                        ) : (
                                            <BiSortDown className={styles.activeSort} />
                                        )
                                    ) : (
                                        <BiSortAlt2 />
                                    )}
                                </span>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className={styles.tbody} {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)

                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </section>

    )
}



