import * as React from "react";
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi';
import {useGlobalFilter, useSortBy, useTable} from 'react-table';
import styles from '../Styles/ComplaintsTable.module.scss';
import {useMemo} from "react";
import {columnsComplaintTable, initialStateComplaintTable} from "./ColumsTables";
import {GlobalFilterInput} from "./GlobalFilterInput";
import {useNavigate} from "react-router-dom";


export default function ComplaintReactTable({complaints, groupUser}) {

    const columns = useMemo(() => columnsComplaintTable, [])
    const data = useMemo(() => complaints, [])
    const initialState = useMemo(() => initialStateComplaintTable, [])
    const navigate = useNavigate();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable({ columns, data, initialState }, useGlobalFilter, useSortBy)

    const newComplaint = (row) => {
        navigate(`/new_complaint`)
    }


    return (
        <section id='t3' className={styles.section}>
            <section className={styles.manageData}>
                <GlobalFilterInput
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}
                />
                {(groupUser === 'Service') || (groupUser === 'Managers') || (groupUser === 'admin')?
                    <button className={styles.addComplaint} onClick={newComplaint}>Добавить рекламацию</button>
                    :
                    <></>
                }
            </section>
            <table id='t3' className={styles.table} {...getTableProps()}>
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



