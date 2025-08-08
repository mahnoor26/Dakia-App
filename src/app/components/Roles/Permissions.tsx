import { Button, Text, Stack, Paper } from '@mantine/core';
import { useState } from 'react';
import { BaseModal } from '../../shared/components/Modal';
import { Permission, PermissionsModalProps } from './Types';

export default function PermissionsModal({ permissions, trigger }: PermissionsModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const groupedPermissions = permissions?.reduce((acc, permission) => {
        const [verb, ...categoryParts] = permission.name.split(' ');
        const category = categoryParts.join(' ');

        if (!acc[category]) {
            acc[category] = {
                verbs: new Set<string>(),
                permissions: [],
            };
        }
        acc[category].verbs.add(verb);
        acc[category].permissions.push(permission);
        return acc;
    }, {} as Record<string, { verbs: Set<string>; permissions: Permission[] }>);

    const verbOrder = ['Add', 'Create', 'View', 'Edit', 'Delete', 'Buy', 'Make', 'Connect'];

    return (
        <>
            {trigger(() => setIsOpen(true))}
            <BaseModal modalTitle="Permissions" opened={isOpen} onClose={() => setIsOpen(false)} size="lg" trigger={() => null}>
                <Stack className="py-4 px-2">
                    {Object?.entries(groupedPermissions)?.map(([category, { verbs }]) => (
                        <Paper key={category} withBorder shadow="sm" className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4">
                            <div>
                                <Text className="font-normal">{category} Management</Text>
                                <Text size="sm" color="dimmed">
                                    {`Manage ${category.toLowerCase()} related permissions.`}
                                </Text>
                            </div>
                            <div className="space-x-1">
                                {Array.from(verbs)
                                    .sort((a, b) => verbOrder.indexOf(a) - verbOrder.indexOf(b))
                                    .map((verb) => (
                                        <Button key={`${category}-${verb}`} className="bg-blue-500" size="xs">
                                            {verb}
                                        </Button>
                                    ))}
                            </div>
                        </Paper>
                    ))}
                </Stack>
            </BaseModal>
        </>
    );
}
