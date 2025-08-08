export interface AuthFormProps {
    isSignIn: boolean;
    onToggleMode: () => void;
}

export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm_pass: string;
    acceptTerms?: boolean;
}
