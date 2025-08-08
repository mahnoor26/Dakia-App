import { useParams, useNavigate } from 'react-router-dom';
import { Card, Text, Loader, Container } from '@mantine/core';
import { useVerifyEmailQuery } from '../../store/auth/authApi';
import bg from '../../assets/Auth/authBg.png';
import { useEffect } from 'react';

export default function VerifyEmail() {
    const { id, hash } = useParams<{ id: string; hash: string }>();
    const navigate = useNavigate();
    const shouldFetch = !!id && !!hash;
    const { data, isFetching, error } = useVerifyEmailQuery({ id: id ?? '', hash: hash ?? '' }, { skip: !shouldFetch });
    const errorMessage = error && 'data' in error ? (error.data as any)?.message : 'Verification Failed!';

    useEffect(() => {
        if (data && !isFetching && !error) {
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [data, isFetching, error, navigate]);

    return (
        <div className="w-screen" style={{ backgroundImage: `url(${bg})` }}>
            <Container size="xs" className="h-screen w-screen flex items-center justify-center">
                <Card shadow="md" padding="xl" className="w-full text-center">
                    <Text fw={700} size="xl" mb="md">
                        Verifying your email...
                    </Text>

                    {isFetching && <Loader size="lg" className="mx-auto mt-4" />}

                    {!isFetching && data && (
                        <>
                            <Text color="green" fw={600}>
                                {data.message}
                            </Text>
                            <Text size="sm" mt="sm">
                                Redirecting to dashboard...
                            </Text>
                        </>
                    )}

                    {!isFetching && error && (
                        <Text color="red" fw={600}>
                            {errorMessage}
                        </Text>
                    )}
                </Card>
            </Container>
        </div>
    );
}
