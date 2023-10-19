import React, {useState} from 'react'
import {useAsyncDebounce} from 'react-table'
import styles from '../Styles/GlobalFilterInput.module.scss';
import 'regenerator-runtime/runtime'

export function GlobalFilterInput({
                                      preGlobalFilteredRows,
                                      globalFilter,
                                      setGlobalFilter
                                  }) {

    const count = preGlobalFilteredRows.length;
    const [ value, setValue ] = useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);

    return (
        <span className={styles.search}>
            Поиск: {''}
            <input
                className={styles.input}
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            />
        </span>
    );
}