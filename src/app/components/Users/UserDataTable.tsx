import { useState } from 'react';
import { Badge, Button, Paper, Text } from '@mantine/core';
import { useGetUsersListQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from '../../store/user/userApi';
import { DataTable } from '../../shared/components/DataTable';
import { User } from './Types';
import { BaseModal } from '../../shared/components/Modal';
import { UserForm } from './UserForms';
import { useGetRolesListQuery } from '../../store/roles/roleApi';
import { TableActions } from '../Roles/TableActions';
import { toast } from 'react-toastify';
import { ColumnVisibilityFilter } from '../../shared/components/ColumnVisibilityFilter';

export default function UsersPage() {
    const { data: usersData, isLoading: isUsersLoading } = useGetUsersListQuery();
    const { data: rolesData } = useGetRolesListQuery();

    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        id: true,
        name: true,
        email: true,
        role: true,
        actions: true,
    });

    const roleOptions =
        rolesData?.data?.roles.map((role) => ({
            value: role.id.toString(),
            label: role.name,
        })) || [];

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (values: any) => {
        try {
            if (selectedUser) {
                await updateUser({
                    id: selectedUser.id,
                    ...values,
                }).unwrap();
                toast.success('User updated successfully');
            } else {
                await createUser(values).unwrap();
                toast.success('User created successfully');
            }
            setIsModalOpen(false);
            setSelectedUser(null);
        } catch {
            toast.error('Failed to save data');
        }
    };

    const handleDelete = async (userId: number) => {
        try {
            await deleteUser({ id: userId });
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error('Failed to delete user');
            console.error(error);
        }
    };

    const toggleColumnVisibility = (columnId: string) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [columnId]: !prev[columnId],
        }));
    };

    const allColumns = [
        {
            id: 'id',
            header: 'Sr.',
            accessor: (user: User) => user.id,
            textAlign: 'center' as const,
        },
        {
            id: 'name',
            header: 'Name',
            accessor: (user: User) => (
                <Text color="dimmed" className="font-normal">
                    {user.name}
                </Text>
            ),
        },
        {
            id: 'email',
            header: 'Email',
            accessor: (user: User) => (
                <Text color="dimmed" truncate>
                    {user.email}
                </Text>
            ),
        },
        {
            id: 'role',
            header: 'Role',
            accessor: (user: User) => <Badge className="bg-primary text-white">{user.roles[0]?.name}</Badge>,
            textAlign: 'left' as const,
        },
        {
            id: 'actions',
            header: 'Action',
            accessor: (user: User) => <TableActions onEdit={() => handleEditClick(user)} onDelete={() => handleDelete(user.id)} />,
            textAlign: 'left' as const,
        },
    ];

    const visibleTableColumns = allColumns.filter((col) => visibleColumns[col.id]);

    return (
        <>
            <Paper withBorder shadow="sm" radius="lg" style={{ display: 'flex', flexDirection: 'column' }}>
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
                        <Button className="bg-primary transition" size="md" radius="md" onClick={handleAddClick}>
                            Add User
                        </Button>
                    </div>
                </div>

                <DataTable<User> data={usersData?.data?.users || []} columns={visibleTableColumns} loading={isUsersLoading} />
            </Paper>

            <BaseModal
                modalTitle={selectedUser ? 'Edit User' : 'Add User'}
                opened={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                }}
            >
                <UserForm
                    initialValues={{
                        roleId: selectedUser?.roles[0]?.id.toString() || '',
                        name: selectedUser?.name || '',
                        email: selectedUser?.email || '',
                        password: '',
                    }}
                    onSubmit={handleSubmit}
                    roles={roleOptions}
                    isEditing={!!selectedUser}
                />
            </BaseModal>
        </>
    );
}
