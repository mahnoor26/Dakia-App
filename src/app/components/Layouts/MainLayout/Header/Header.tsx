import { Container, Group, Button, Text, Drawer, ScrollArea } from '@mantine/core';
import { Link } from 'react-router-dom';
import { headerLinks } from '../../../../shared/data/HeaderLinks';
import DakiaLogo from '../../../../shared/components/DakiaLogo';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import MobileDrawer from './MobileDrawer';

export default function Header() {
    const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <Container size="lg" className="px-5 md:px-2">
                <div className="flex items-center justify-between h-20">
                    <DakiaLogo />

                    <Group className="hidden md:flex gap-12">
                        {headerLinks.map((link) => (
                            <Link key={link.name} to={link.path} className="relative group text-secondary hover:text-primary text-md font-medium overflow-hidden">
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-1/2"></span>
                            </Link>
                        ))}
                        <Button className="bg-primary shadow-[0px_16px_40px_-6px_rgba(0,0,0,0.3)] transition" size="lg" radius="md">
                            Get Started
                        </Button>
                    </Group>

                    <IconMenu2 size={32} onClick={() => setDrawerOpened(true)} className="cursor-pointer md:hidden text-primary" />
                </div>
            </Container>

            <MobileDrawer opened={drawerOpened} onClose={() => setDrawerOpened(false)} />
        </header>
    );
}
