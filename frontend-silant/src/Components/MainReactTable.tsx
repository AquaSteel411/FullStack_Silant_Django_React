import * as React from "react";
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi'
import { useSortBy, useTable, useGlobalFilter, useFilters } from 'react-table'
import styles from '../Styles/MainTable.module.scss'
import stylesAuth from "../Styles/AfterAuth.module.scss";
import {useMemo} from "react";
import {columnsMainTable, initialStateMainTable} from "./ColumsTables";
import {useNavigate} from "react-router-dom";
import {GlobalFilterInput} from "./GlobalFilterInput";
import 'regenerator-runtime/runtime'


export default function MainReactTable({machines, groupUser}) {


    const data = useMemo(() => machines, []);
    const columns = useMemo(() => columnsMainTable,[])
    const initialState = React.useMemo(() => initialStateMainTable, []);
    const navigate = useNavigate();

    const machineDetail = (row) => {
        navigate(`machine/${row.values.serial_number_model}`)
    }

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

    const newMachine = (row) => {
        navigate(`/new_machine`)
    }

    return (
        <section id='t1' className={`${styles.section} ${stylesAuth.active}`}>
            <section className={styles.manageData}>
                <GlobalFilterInput
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}
                />
                {(groupUser === 'Managers') || (groupUser === 'admin')?
                    <button className={styles.addMachine} onClick={newMachine}>Добавить машину</button>
                    :
                    <></>
                }
            </section>
            <table className={`${styles.table}`} {...getTableProps()}>
                <thead className={styles.thead}>
                {headerGroups.map((hG) => (
                    <tr {...hG.getHeaderGroupProps()}>
                        {hG.headers.map((col) => (
                            <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                                {col.render('Header')}{' '}
                                {/* если колонка является сортируемой, рендерим рядом с заголовком соответствующую иконку в зависимости от того, включена ли сортировка, а также на основе порядка сортировки */}
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
                <tbody {...getTableBodyProps()} className={styles.tbody}>

                {rows.map((row) => {
                    prepareRow(row);

                    return (
                        <tr {...row.getRowProps()} onClick={() => machineDetail(row)}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </section>

    )
}

//onClick={() => machineDetail(row)}





