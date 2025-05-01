import { Head, useForm } from '@inertiajs/react';

// import { Button } from '@/components/ui/button';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './login.module.css';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.innerContainer}>
                <Head title="Log in" />
                <h1 className={styles.header}>Login</h1>
                <form className={styles.form} onSubmit={submit}>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="email">
                                Email address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />
                            <label>{errors.email}</label>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="password">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                            />
                            <label>{errors.password}</label>
                        </div>
                        <Button type="submit" tabIndex={4} disabled={processing}>
                            Log in
                        </Button>
                    </div>

                    <div className={styles.signUpButton}>
                        Don't have an account?{' '}
                        <a href={route('register')} tabIndex={5}>
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
