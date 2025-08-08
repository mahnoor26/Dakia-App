import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { BaseModal } from '../../shared/components/Modal';
import { RoleModalProps } from './Types';
import RoleForm from './RoleForm';

export function RoleModal({ mode, opened, onClose, onSubmit, isSubmitting, error, roleToEdit }: RoleModalProps) {
    return (
        <BaseModal modalTitle={`${mode === 'add' ? 'Add' : 'Edit'} Role`} opened={opened} onClose={onClose}>
            {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
                    {error}
                </Alert>
            )}
            <RoleForm initialValues={mode === 'edit' ? roleToEdit : null} onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </BaseModal>
    );
}
