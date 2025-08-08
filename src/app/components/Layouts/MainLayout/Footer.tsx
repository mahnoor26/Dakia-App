import { Container, Group, Text } from '@mantine/core';
import DakiaLogo from '../../../shared/components/DakiaLogo';
import { links, socialImages } from '../../../shared/data/FooterLinks';
export default function Footer() {
    return (
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 py-12">
            <Container size="lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-700 py-6">
                    <DakiaLogo />

                    <Group gap="lg" className="hidden md:flex">
                        {links.map((link) => (
                            <Text key={link.name} size="sm" c="" className=" text-secondary font-semibold hover:text-gray-900 cursor-pointer">
                                {link.name}
                            </Text>
                        ))}
                    </Group>

                    <Group gap="lg">
                        {socialImages.map((social, index) => (
                            <div key={index}>
                                <img src={social.icon} alt={social.label} />
                            </div>
                        ))}
                    </Group>
                </div>
                <Text ta="center" size="sm" c="dimmed" mt="lg">
                    © 2024 Dakia.ai. All Rights Reserved.
                </Text>
            </Container>
        </footer>
    );
}
