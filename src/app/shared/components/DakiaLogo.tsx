import { Text } from '@mantine/core';
import Logo from '../../assets/logo.png';

function DakiaLogo() {
    return (
        <div className="flex items-center space-x-3 justify-center">
            <img src={Logo} alt="logo" className='w-8 h-8"' />
            <Text size="xl" p={0} fw={700} c="dark">
                Dakia.ai
            </Text>
        </div>
    );
}

export default DakiaLogo;
