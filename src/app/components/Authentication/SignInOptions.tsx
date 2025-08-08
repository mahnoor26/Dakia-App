import { Button, Stack } from '@mantine/core';
import React from 'react';
import { socialButtons } from '../../shared/data/AuthData';

function SignInOptions() {
    return (
        <Stack gap="xs">
            {socialButtons.map((social) => (
                <Button key={social.name} className="w-full bg-white border border-gray-300 text-black hover:text-black font-medium text-sm h-11 rounded-md hover:bg-gray-300 transition">
                    Sign up with {social.name}
                </Button>
            ))}
        </Stack>
    );
}

export default SignInOptions;
