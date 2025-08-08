import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../store/auth/authApi';
import { setCredentials } from '../../store/userSlice';
import { Modal, Button, Text } from '@mantine/core';
import { IconMailCheck } from '@tabler/icons-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const { user } = useSelector((state: RootState) => state.auth);
    const [verificationModalOpen, setVerificationModalOpen] = useState(false);
    const {
        data: userData,
        isLoading,
        isError,
    } = useGetUserQuery(undefined, {
        skip: !token || !!user,
    });

    useEffect(() => {
        if (userData && token) {
            dispatch(
                setCredentials({
                    user: userData.data,
                    token: token,
                })
            );

            // Check if email is not verified
            if (!userData.data.email_verified_at) {
                setVerificationModalOpen(true);
            }
        }
    }, [userData, token, dispatch]);

    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (isLoading) {
        return <div className="text-center">Loading user data...</div>;
    }

    if (isError) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return (
        <>
            {children}

            <Modal opened={verificationModalOpen} onClose={() => setVerificationModalOpen(false)} centered>
                <div className="flex flex-col items-center gap-3 justify-center mb-3">
                    <IconMailCheck size={48} color="orange" />
                    <h2 className="font-bold text-2xl text-center">Email Verification Required</h2>
                    <Text size="md" color="dimmed" className="text-center">
                        Please check your email and complete the verification process. We've sent a verification link to your email address.
                    </Text>
                    <div className=" flex gap-3">
                        <Button className="bg-transparent text-primary border border-primary hover:bg-gray-50 hover:text-primary" onClick={() => setVerificationModalOpen(false)} mt="md">
                            I Understand
                        </Button>
                        <Button className="bg-primary text-white" onClick={() => setVerificationModalOpen(false)} mt="md">
                            Resend Link
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProtectedRoute;
