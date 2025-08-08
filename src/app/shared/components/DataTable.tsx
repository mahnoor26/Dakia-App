import { Table, Checkbox, ScrollArea, Center, Loader, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TableProps } from '../../components/Users/Types';
import { useEffect, useState } from 'react';

export function DataTable<T>({ data, columns, loading = false }: TableProps<T>) {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAll, { toggle: toggleSelectAll }] = useDisclosure(false);

    const handleRowSelect = (index: number) => {
        setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
    };

    useEffect(() => {
        if (selectAll) {
            setSelectedRows(data.map((_, index) => index));
        } else {
            setSelectedRows([]);
        }
    }, [selectAll, data]);

    return (
        <div className="overflow-x-auto">
            <div style={{ minWidth: '500px' }}>
                <Table striped highlightOnHover>
                    <thead style={{ backgroundColor: 'transparent' }}>
                        <tr>
                            <th style={{ width: 40 }}>
                                <Checkbox checked={selectAll} onChange={toggleSelectAll} indeterminate={selectedRows.length > 0 && selectedRows.length < data.length} />
                            </th>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    style={{
                                        width: column.width,
                                        textAlign: column.textAlign || 'left',
                                    }}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + 1}>
                                    <Center py="xl">
                                        <Loader />
                                    </Center>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1}>
                                    <Center py="xl">
                                        <Text color="dimmed">No data available</Text>
                                    </Center>
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Checkbox checked={selectedRows.includes(index)} onChange={() => handleRowSelect(index)} />
                                    </td>
                                    {columns.map((column) => (
                                        <td
                                            key={`${column.id}-${index}`}
                                            style={{
                                                textAlign: column.textAlign || 'left',
                                            }}
                                        >
                                            {column.accessor(item)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
