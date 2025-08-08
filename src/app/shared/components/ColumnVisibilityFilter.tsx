import { Menu, Checkbox, Group, ActionIcon } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { ColumnVisibilityFilterProps } from './Types';

export function ColumnVisibilityFilter({ columns, onToggle }: ColumnVisibilityFilterProps) {
    const [opened, setOpened] = useState(false);

    return (
        <Menu position="bottom-end" withinPortal opened={opened} onChange={setOpened} closeOnItemClick={false}>
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray" style={{ cursor: 'pointer' }}>
                    <IconFilter size={18} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Table Columns</Menu.Label>
                {columns.map((column) => (
                    <Menu.Item key={column.id}>
                        <Group gap="xs">
                            <Checkbox checked={column.visible} onChange={() => onToggle(column.id)} />
                            <span>{column.header}</span>
                        </Group>
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}
