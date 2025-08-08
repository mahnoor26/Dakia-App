import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Button, Checkbox, Divider, Group, Stack, Text, TextInput, Anchor, PasswordInput } from '@mantine/core';
import SignInOptions from './SignInOptions';
import { AuthFormProps, FormValues } from './Types';
import { useLoginMutation, useRegisterMutation } from '../../store/auth/authApi';
import { signInSchema, signUpSchema } from './AuthSchemas';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AuthForm({ isSignIn, onToggleMode }: AuthFormProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

    const initialValues: FormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm_pass: '',
        acceptTerms: false,
    };

    const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        try {
            if (isSignIn) {
                const res = await login({
                    email: values.email,
                    password: values.password,
                }).unwrap();
                toast.success('User logged in successfully');
                dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
            } else {
                const res = await register({
                    name: `${values.firstName.trim()} ${values.lastName.trim()}`,
                    email: values.email,
                    password: values.password,
                    password_confirmation: values.confirm_pass,
                }).unwrap();
                toast.success('User registered successfully');
                dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
            }
            navigate('/dashboard');
            formikHelpers.resetForm();
        } catch (error) {
            toast.error('Failed to sign in');
            console.error('Auth Error:', error);
            formikHelpers.resetForm();
        }
    };

    return (
        <div className="py-8 md:pl-14 text-left">
            <p className="font-bold text-2xl md:text-3xl mb-5">Sign {isSignIn ? 'in ' : 'up '} to Dakia.ai</p>

            <Formik initialValues={initialValues} validationSchema={isSignIn ? signInSchema : signUpSchema} onSubmit={handleSubmit} enableReinitialize>
                {({ errors, touched, values, setFieldValue, resetForm }) => (
                    <Form className="md:max-w-[27.5rem]">
                        <Stack gap="lg">
                            {!isSignIn && (
                                <Group grow align="top">
                                    <Field name="firstName">
                                        {({ field }: any) => (
                                            <TextInput
                                                {...field}
                                                size="md"
                                                label="First Name"
                                                placeholder="First Name"
                                                error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                                                radius="md"
                                            />
                                        )}
                                    </Field>

                                    <Field name="lastName">
                                        {({ field }: any) => (
                                            <TextInput
                                                {...field}
                                                size="md"
                                                label="Last Name"
                                                placeholder="Last Name"
                                                error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                                                radius="md"
                                            />
                                        )}
                                    </Field>
                                </Group>
                            )}

                            <Field name="email">
                                {({ field }: any) => <TextInput {...field} size="md" label="Email" placeholder="Email" type="email" error={touched.email && errors.email} radius="md" />}
                            </Field>

                            <Field name="password">
                                {({ field }: any) => (
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <Text size="md" fw={500}>
                                                Password
                                            </Text>
                                            {isSignIn && (
                                                <Anchor size="md" className="text-primary">
                                                    Forgot Password?
                                                </Anchor>
                                            )}
                                        </div>
                                        <PasswordInput {...field} size="md" placeholder="Password" error={touched.password && errors.password} radius="md" />
                                    </div>
                                )}
                            </Field>
                            {!isSignIn && (
                                <Field name="confirm_pass">
                                    {({ field }: any) => <PasswordInput {...field} size="md" placeholder="Confirm Password" error={touched.confirm_pass && errors.confirm_pass} radius="md" />}
                                </Field>
                            )}

                            {!isSignIn && (
                                <Field name="acceptTerms">
                                    {({ field }: any) => (
                                        <Checkbox
                                            {...field}
                                            checked={values.acceptTerms}
                                            onChange={(event) => setFieldValue('acceptTerms', event.currentTarget.checked)}
                                            label={
                                                <Text size="sm">
                                                    I've read and accepted{' '}
                                                    <Anchor size="sm" className="text-primary font-semibold">
                                                        Terms of Service
                                                    </Anchor>{' '}
                                                    and{' '}
                                                    <Anchor size="sm" className="text-primary font-semibold">
                                                        Privacy Policy
                                                    </Anchor>
                                                </Text>
                                            }
                                            error={touched.acceptTerms && errors.acceptTerms}
                                        />
                                    )}
                                </Field>
                            )}

                            <Button type="submit" className="bg-primary" size="lg" radius="md" loading={isRegistering || isLoggingIn} fullWidth>
                                {isSignIn ? 'Sign In' : 'Create Account'}
                            </Button>

                            <Text size="sm" className="text-secondary">
                                {isSignIn ? "Don't have an account? " : 'Already have an account? '}
                                <Anchor size="sm" onClick={onToggleMode} className="cursor-pointer text-primary font-semibold">
                                    {isSignIn ? 'Create Account' : 'Log In'}
                                </Anchor>
                            </Text>

                            <Divider
                                label={
                                    <Text c="red" fw={700} size="lg">
                                        or use
                                    </Text>
                                }
                                labelPosition="center"
                            />

                            <SignInOptions />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
