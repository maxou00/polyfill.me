import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useCallback } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getBaseUrl, supaClient } from "../../core/utils";
import styles from "../../styles/Signin.module.scss";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import { Initializer } from "../../ui/Initializer";
import { Logo } from "../../ui/Logo";
import Head from "next/head";
import { NoTransformButton } from "../../ui/styled";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

function SigninScreen() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const router = useRouter();

    const onSubmit = useCallback((ev: ChangeEvent<HTMLFormElement>) => {
        ev.preventDefault();

        let data = {
            email: ev.currentTarget.email.value,
            password: ev.currentTarget.password.value,
        }

        let errs: any = {}

        if (!data.email) {
            errs.email = "Enter your email";
        }

        if (!data.password) {
            errs.password = "Enter your password";
        }

        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            return;
        }

        setLoading(true);
        supaClient.auth.signIn(data)
            .then((result) => {
                setLoading(false);
                if (result.error) {
                    toast.error(result.error.message);
                }
                else {
                    router.replace("/editor");
                }
            })
    }, [router]);

    const signinWithGoogle = useCallback(() => {
        let authUrl = supaClient.auth.api.getUrlForProvider("google", { redirectTo: getBaseUrl()+"/dashboard" });
        window.location.replace(authUrl);
    }, []);

    return <Initializer>
        <Head>
            <title>Authentification</title>
        </Head>
        <Box className={styles.page}>
            <Box className={styles.header}>
                <div className={styles.logoWrapper}>
                    <Logo size={32} />
                    <Typography variant="h5" data-role="title">Polyfill.me</Typography>
                </div>
            </Box>
            <main className={styles.body}>
                <Box className={styles.formWrapper}>
                    <Grid container component="form" spacing={2} onSubmit={onSubmit}>
                        <Grid item xs={12}>
                            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                <Typography variant="h5" data-role="title">Connexion</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size="small" type="email" fullWidth label="Email" variant="outlined" name="email" error={errors.email} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size="small" type="password" fullWidth label="Mot de passe" variant="outlined" name="password" error={errors.password} />
                        </Grid>

                        {loading && <Grid item xs={12}>
                            <Box padding={2} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                <PropagateLoader color="#999" size={12} />
                            </Box>
                        </Grid>}
                        <Grid item xs={12}>
                            <NoTransformButton disabled={loading} type="submit" variant="contained" color="primary" fullWidth disableElevation>Se connecter</NoTransformButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                                <NoTransformButton onClick={signinWithGoogle} size="small" variant="outlined" color="primary" disableElevation startIcon={<FcGoogle />}>Se connecter avec Google</NoTransformButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="/auth/signup" passHref>
                                <a className={styles.link}>
                                    <i className="fi-rr-user-add" data-role="icon"></i>
                                    <span data-role="text">
                                        Pas de compte ? S&apos;inscrire
                                    </span>
                                </a>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </main>
        </Box>
    </Initializer>
}

export default SigninScreen;