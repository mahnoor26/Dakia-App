import { TextInput, Select, PasswordInput, Button } from '@mantine/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserFormProps } from './Types';
import { useMemo } from 'react';

export function UserForm({ initialValues, onSubmit, roles, isEditing = false }: UserFormProps) {
    const validationSchema = useMemo(
        () =>
            Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email').required('Email is required'),
                roleId: Yup.string().required('Role is required'),
                password: isEditing ? Yup.string() : Yup.string().min(8).required('Password is required'),
            }),
        [isEditing]
    );

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 px-6 py-4">
            <TextInput
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
                radius="md"
                size="md"
            />

            <TextInput
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                radius="md"
                size="md"
            />

            <Select
                label="Role"
                name="roleId"
                placeholder="Select a role"
                data={roles}
                value={formik.values.roleId}
                onChange={(value) => formik.setFieldValue('roleId', value)}
                onBlur={formik.handleBlur}
                error={formik.touched.roleId && formik.errors.roleId}
                radius="md"
                size="md"
            />

            {!isEditing && (
                <PasswordInput
                    label="Password"
                    name="password"
                    placeholder="Enter a password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password}
                    radius="md"
                    size="md"
                />
            )}

            <div className="flex justify-end gap-3 pt-4">
                <Button type="submit" className="bg-primary" radius="md" size="md">
                    {isEditing ? 'Update User' : 'Add User'}
                </Button>
            </div>
        </form>
    );
}
