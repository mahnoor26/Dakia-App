import { useState } from 'react';
import { ActionIcon, Button, Paper, Text, LoadingOverlay, Alert } from '@mantine/core';
import { IconFilter, IconEye, IconAlertCircle } from '@tabler/icons-react';
import { useCreateRoleMutation, useDeleteRoleMutation, useGetRolesListQuery, useUpdateRoleMutation } from '../../store/roles/roleApi';
import { DataTable } from '../../shared/components/DataTable';
import PermissionsModal from './Permissions';
import { Role } from './Types';
import { RoleModal } from './RoleModal';
import { TableActions } from './TableActions';
import { toast } from 'react-toastify';
import { ColumnVisibilityFilter } from '../../shared/components/ColumnVisibilityFilter';

export default function RolesData() {
    const { data, isLoading, isError } = useGetRolesListQuery();
    const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
    const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
    const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
    const [roleToEdit, setRoleToEdit] = useState<any>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        id: true,
        name: true,
        permissions: true,
        actions: true,
    });

    const toggleColumnVisibility = (columnId: string) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [columnId]: !prev[columnId],
        }));
    };
    const handleAddRole = () => setIsAddModalOpen(true);
    const handleEditRole = (role: Role) => setRoleToEdit(role);
    const handleDeleteRole = async (id: number | undefined) => {
        if (!id) return;

        try {
            await deleteRole({ id }).unwrap();
            toast.success('Role deleted successfully');
        } catch (err) {
            const errorMessage = (err as { data?: { message?: string } })?.data?.message || 'Failed to delete role';
            toast.error(errorMessage);
            console.error('Delete role error:', err);
        }
    };

    const handleSubmit = async (values: { name: string; description: string; permissions: number[] }) => {
        setError(null);
        try {
            if (roleToEdit?.id) {
                await updateRole({ id: roleToEdit.id, ...values });
                toast.success('Role updated successfully');
            } else {
                await createRole(values);
                toast.success('Role created successfully');
            }
            handleCloseModal();
        } catch (e) {
            toast.error('Failed to save data');
        }
    };

    const handleCloseModal = () => {
        setRoleToEdit(null);
        setIsAddModalOpen(false);
    };

    const allColumns = [
        {
            id: 'id',
            header: 'Sr.',
            accessor: (role: Role) => role.id,
            textAlign: 'center' as const,
        },
        {
            id: 'name',
            header: 'Name',
            accessor: (role: Role) => (
                <Text color="dimmed" className="font-normal">
                    {role.name}
                </Text>
            ),
        },
        {
            id: 'permissions',
            header: 'Permissions',
            accessor: (role: Role) => (
                <PermissionsModal
                    permissions={
                        role?.permissions?.map((p: any) => ({
                            id: p.id,
                            name: p?.name || `Permission ${p.id}`,
                        })) || []
                    }
                    trigger={(open) => (
                        <ActionIcon
                            color="blue"
                            variant="transparent"
                            onClick={(e) => {
                                e.stopPropagation();
                                open();
                            }}
                        >
                            <IconEye size="1.25rem" />
                        </ActionIcon>
                    )}
                />
            ),
            textAlign: 'center' as const,
        },
        {
            id: 'actions',
            header: 'Action',
            accessor: (role: Role) => (role.name === 'owner' ? null : <TableActions onEdit={() => handleEditRole(role)} onDelete={() => handleDeleteRole(role?.id)} />),
            textAlign: 'left' as const,
        },
    ];

    const visibleTableColumns = allColumns.filter((col) => visibleColumns[col.id]);

    return (
        <>
            <Paper withBorder shadow="sm" radius="lg" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <LoadingOverlay visible={isLoading || isCreating || isUpdating || isDeleting} />

                {isError && (
                    <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                        Failed to load roles. Please try again.
                    </Alert>
                )}

                <div style={{ background: '#F0F8F6' }}>
                    <div className="flex justify-between items-center p-6">
                        <div className="bg-white p-2 rounded-lg">
                            <ColumnVisibilityFilter
                                columns={allColumns.map((col) => ({
                                    id: col.id,
                                    header: col.header,
                                    visible: visibleColumns[col.id],
                                }))}
                                onToggle={toggleColumnVisibility}
                            />
                        </div>
                        <Button className="bg-primary transition" size="md" radius="md" onClick={handleAddRole} loading={isCreating}>
                            Add Role
                        </Button>
                    </div>
                </div>

                <DataTable<Role> data={data?.data?.roles || []} columns={visibleTableColumns} loading={isLoading} />
            </Paper>

            <RoleModal mode="add" opened={isAddModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} isSubmitting={isCreating} error={error} />

            <RoleModal mode="edit" opened={!!roleToEdit} onClose={handleCloseModal} onSubmit={handleSubmit} isSubmitting={isUpdating} error={error} roleToEdit={roleToEdit || null} />
        </>
    );
}
