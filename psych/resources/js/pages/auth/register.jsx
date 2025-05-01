import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import styles from './register.module.css';
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [checkPassword, setCheckPassword] = useState([0, 0, 0, 0]);
    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    useEffect(() => {
        let checker = [0, 0, 0, 0, 0];
        if (data.password.length < 8) {
            checker[0] = 0;
        } else {
            checker[0] = 1;
        }

        if (/[A-Z]/.test(data.password)) {
            checker[1] = 1;
        } else {
            checker[1] = 0;
        }

        if (/\d/.test(data.password)) {
            checker[2] = 1;
        } else {
            checker[2] = 0;
        }

        if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.password)) {
            checker[3] = 1;
        } else {
            checker[3] = 0;
        }

        if (data.password === data.password_confirmation && data.password != '') {
            checker[4] = 1;
        } else {
            checker[4] = 0;
        }
        setCheckPassword(checker);
    }, [data]);

    return (
        <div className={styles.registerContainer}>
            <div className={styles.innerContainer}>
                <Head title="Register" />
                <h1 className={styles.header}>Sign Up</h1>
                <form className={styles.form} onSubmit={submit}>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="name">
                                Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <label message={errors.name} className="mt-2" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="email">
                                Email address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <label message={errors.email} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="password">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <label message={errors.password} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="password_confirmation">
                                Confirm password
                            </label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <label message={errors.password_confirmation} />
                        </div>
                        <div>
                            <div className={styles.passwordCheckerContainer}>
                                {checkPassword[0] === 1 ? (
                                    <CheckCircleRoundedIcon style={{ fontSize: '2rem', color: '#38b000' }} />
                                ) : (
                                    <CancelRoundedIcon style={{ fontSize: '2rem', color: '#da1e37' }} />
                                )}
                                <label style={{ fontSize: '1.4rem' }}>Requires 8 characters</label>
                            </div>
                            <div className={styles.passwordCheckerContainer}>
                                {checkPassword[1] === 1 ? (
                                    <CheckCircleRoundedIcon style={{ fontSize: '2rem', color: '#38b000' }} />
                                ) : (
                                    <CancelRoundedIcon style={{ fontSize: '2rem', color: '#da1e37' }} />
                                )}
                                <label style={{ fontSize: '1.4rem' }}>Requires 1 uppercase character</label>
                            </div>
                            <div className={styles.passwordCheckerContainer}>
                                {checkPassword[2] === 1 ? (
                                    <CheckCircleRoundedIcon style={{ fontSize: '2rem', color: '#38b000' }} />
                                ) : (
                                    <CancelRoundedIcon style={{ fontSize: '2rem', color: '#da1e37' }} />
                                )}
                                <label style={{ fontSize: '1.4rem' }}>Requires 1 number</label>
                            </div>
                            <div className={styles.passwordCheckerContainer}>
                                {checkPassword[3] === 1 ? (
                                    <CheckCircleRoundedIcon style={{ fontSize: '2rem', color: '#38b000' }} />
                                ) : (
                                    <CancelRoundedIcon style={{ fontSize: '2rem', color: '#da1e37' }} />
                                )}
                                <label style={{ fontSize: '1.4rem' }}>Requires 1 special character i.e ?!%$</label>
                            </div>
                            <div className={styles.passwordCheckerContainer}>
                                {checkPassword[4] === 1 ? (
                                    <CheckCircleRoundedIcon style={{ fontSize: '2rem', color: '#38b000' }} />
                                ) : (
                                    <CancelRoundedIcon style={{ fontSize: '2rem', color: '#da1e37' }} />
                                )}
                                <label style={{ fontSize: '1.4rem' }}>Passwords match</label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="mt-2 w-full"
                            tabIndex={5}
                            disabled={processing || !checkPassword.every((item) => item === 1)}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create account
                        </Button>
                    </div>

                    <div className={styles.loginButton}>
                        Already have an account?{' '}
                        <a href={route('login')} tabIndex={6}>
                            Log in
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
