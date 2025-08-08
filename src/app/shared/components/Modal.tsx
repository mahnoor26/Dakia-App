import { ActionIcon, Modal } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { BaseModalProps } from './Types';

export function BaseModal({ children, trigger, modalTitle = '', opened, onClose, ...props }: BaseModalProps) {
    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title={
                    <div className="flex items-center gap-2">
                        <ActionIcon color="blue" variant="transparent">
                            <IconUser size="1.25rem" />
                        </ActionIcon>
                        <h2 className="text-xl font-bold">{modalTitle}</h2>
                    </div>
                }
                size="xl"
                radius="lg"
                overlayProps={{ blur: 3 }}
                {...props}
            >
                {children}
            </Modal>
        </>
    );
}
