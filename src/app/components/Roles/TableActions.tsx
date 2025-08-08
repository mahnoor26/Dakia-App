import { ActionIcon, Tooltip } from '@mantine/core';
import { IconUserEdit, IconTrash } from '@tabler/icons-react';
import { TableActionsProps } from './Types';

export function TableActions({ onEdit, onDelete, hideEdit, hideDelete }: TableActionsProps) {
    return (
        <div className="flex gap-0 sm:gap-2">
            {!hideEdit && onEdit && (
                <Tooltip label="Edit" withArrow>
                    <ActionIcon
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        color="blue"
                        variant="subtle"
                    >
                        <IconUserEdit size="1.25rem" />
                    </ActionIcon>
                </Tooltip>
            )}
            {!hideDelete && onDelete && (
                <Tooltip label="Delete" withArrow>
                    <ActionIcon
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        color="red"
                        variant="subtle"
                    >
                        <IconTrash size="1.25rem" />
                    </ActionIcon>
                </Tooltip>
            )}
        </div>
    );
}
