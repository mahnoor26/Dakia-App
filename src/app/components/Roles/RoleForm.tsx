import { Button, Paper, TextInput, Group, Text, Loader } from '@mantine/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetPermissionsQuery } from '../../store/roles/roleApi';
import { GroupedPermission, Permission, PermissionsApiResponse, RoleFormProps, RoleFormValues } from './Types';

const RoleFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    permissions: Yup.array().min(1, 'Select at least one permission'),
});

export default function RoleForm({ initialValues, onSubmit, isSubmitting }: RoleFormProps) {
    const { data: permissionsData } = useGetPermissionsQuery<PermissionsApiResponse>();

    const formik = useFormik<RoleFormValues>({
        initialValues: {
            name: initialValues?.name || '',
            description: initialValues?.description || '',
            permissions: initialValues?.permissions?.map((p: any) => p.id) || [],
        },
        validationSchema: RoleFormSchema,
        onSubmit,
        enableReinitialize: true,
    });

    const permissionsList = permissionsData?.data?.permissions || [];
    console.log('permission', permissionsList);

    const groupedPermissions = permissionsList?.reduce((acc: Record<string, GroupedPermission[]>, permission: Permission) => {
        const [verb, ...categoryParts] = permission.name.split(' ');
        const category = categoryParts.join(' ');

        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push({
            ...permission,
            verb,
            isSelected: formik.values.permissions.includes(permission.id),
        });
        return acc;
    }, {} as Record<string, { id: number; name: string; verb: string; isSelected: boolean }[]>);

    const togglePermission = (permissionId: number) => {
        const currentPermissions = [...formik.values.permissions];
        const index = currentPermissions.indexOf(permissionId);

        if (index === -1) {
            currentPermissions.push(permissionId);
        } else {
            currentPermissions.splice(index, 1);
        }

        formik.setFieldValue('permissions', currentPermissions);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Paper withBorder p="md" mb="md">
                <TextInput
                    label="Role Name"
                    placeholder="Enter role name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                    mb="md"
                />

                <TextInput
                    label="Description"
                    placeholder="Enter role description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && formik.errors.description}
                    mb="md"
                />
            </Paper>

            <Paper withBorder p="md">
                <Text size="lg" className="font-bold" mb="sm">
                    Permissions
                </Text>
                {formik.touched.permissions && formik.errors.permissions && (
                    <Text color="red" size="sm" mb="md">
                        {formik.errors.permissions}
                    </Text>
                )}

                {groupedPermissions &&
                    Object?.entries(groupedPermissions)?.map(([category, permissions]) => (
                        <div key={category} style={{ marginBottom: '1rem' }}>
                            <Text className="font-bold" mb="xs">
                                {category}
                            </Text>
                            <div className="space-x-1">
                                {permissions?.map((permission: GroupedPermission) => (
                                    <Button
                                        key={permission.id}
                                        size="xs"
                                        className={
                                            permission.isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-primary hover:bg-gray-200' // Default state
                                        }
                                        onClick={() => togglePermission(permission.id)}
                                    >
                                        {permission.verb}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
            </Paper>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="submit" className="bg-primary" radius="md" size="md" loading={isSubmitting} disabled={!formik.isValid || isSubmitting}>
                    {initialValues?.id ? 'Update Role' : 'Create Role'}
                </Button>
            </div>
        </form>
    );
}
