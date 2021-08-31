import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, HTMLFactory, useCallback } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { supaClient } from "../../core/utils";
import styles from "../../styles/Signin.module.scss";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import { Initializer } from "../../ui/Initializer";

function SignupScreen() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const router = useRouter();

    const onSubmit = useCallback((ev: ChangeEvent<HTMLFormElement>) => {
        ev.preventDefault();

        let data = {
            fullname: ev.currentTarget.fullname.value,
            email: ev.currentTarget.email.value,
            password: ev.currentTarget.password.value,
            confirmPassword: ev.target.confirmPassword.value
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
        supaClient.auth.signUp({
            email: data.email,
            password: data.password
        })
            .then((result) => {
                return supaClient.auth.update({
                    data: {
                        name: data.fullname
                    }
                })
            })
            .then((result) => {
                setLoading(false);
                if (result.error) {
                    toast.error(result.error.message);
                }
                else {
                    router.replace("/auth/signin");
                }
            })
    }, [router]);

    return <Initializer>
        <Box className={styles.page}>
            <Box className={styles.formWrapper}>
                <Box className={styles.header}>
                    <Typography variant="h3">Polyfill</Typography>
                    <Typography variant="body1">Créez des formulaires et effectuez vos collectes facilement.</Typography>
                </Box>
                <Grid container component="form" spacing={2} onSubmit={onSubmit}>
                    <Grid item xs={12}>
                        <TextField size="small" type="text" fullWidth label="Votre nom" variant="outlined" name="fullname" error={errors.fullName} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size="small" type="email" fullWidth label="Email" variant="outlined" name="email" error={errors.email} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size="small" type="password" fullWidth label="Mot de passe" variant="outlined" name="password" error={errors.password} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size="small" type="password" fullWidth label="Confirmez votre mot de passe" variant="outlined" name="confirmPassword" error={errors.confirmPassword} />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !loading && <Button type="submit" variant="contained" color="primary" size="small" fullWidth disableElevation>S&apos;inscrire</Button>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" size="small" disableElevation>Connexion Google</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Link href="/auth/signup">Se connecter</Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Initializer>
}

export default SignupScreen;