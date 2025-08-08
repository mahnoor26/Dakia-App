import { Drawer, Button, ScrollArea } from '@mantine/core';
import { Link } from 'react-router-dom';
import { headerLinks } from '../../../../shared/data/HeaderLinks';
import { MobileDrawerProps } from './Types';

export default function MobileDrawer({ opened, onClose }: MobileDrawerProps) {
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            size="80%"
            padding="lg"
            position="right"
            classNames={{
                body: 'bg-primary text-white',
                content: 'bg-primary',
                header: 'bg-primary',
            }}
            withCloseButton={false}
        >
            <ScrollArea className="h-full">
                <div className="flex flex-col gap-6 mt-10">
                    {headerLinks.map((link) => (
                        <Link key={link.name} to={link.path} onClick={onClose} className="text-white text-xl font-medium hover:underline">
                            {link.name}
                        </Link>
                    ))}
                    <Button fullWidth radius="md" size="lg" className="bg-white text-primary font-semibold mt-6">
                        Get Started
                    </Button>
                </div>
            </ScrollArea>
        </Drawer>
    );
}
