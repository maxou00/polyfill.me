import styles from '../styles/TopAppBar.module.scss'
import { MdAdd, MdKeyboardArrowDown, MdPerson, MdSave, MdSettings, MdVisibility } from 'react-icons/md';
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemText, MenuItem, Popover, Tooltip, Typography, useTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useState } from 'react';
import { useEffect } from 'react';
import { supaClient } from '../core/utils';
import Supabase from "@supabase/supabase-js";
import { useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import { CreateFormDialog } from './form/CreateFormDialog';
import { DataForm } from '../engine/page';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useFillable, useGlobalState } from '../state/selectors';
import { ClockLoader } from 'react-spinners';
import { setActiveForm } from '../state/middlewares';
import { FillableSettingsEditor } from './settings/FillableSettingsEditor';
import { Logo } from '../ui/Logo';

export default function TopAppBar() {
  const [session, setSession] = useState<Supabase.Session>();
  const [createOpen, setCreateOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formPickerAnchor, setFormPickerAnchor] = useState<HTMLButtonElement>();
  const [profileAnchor, setProfileAnchor] = useState<HTMLDivElement>();

  const { forms } = useGlobalState();
  const fillable = useFillable();
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();

  const onAuthenticate = useCallback(() => {
    router.push("/auth/signin");
  }, [router]);

  const onPreview = useCallback(() => {
    window.open(`http://localhost:5000/preview/${fillable.id}`, "_blank");
  }, [fillable]);

  const fillableAlreadyExists = useCallback((id: string) => {
    return Boolean(forms.find((f) => f.id === id));
  }, [forms]);

  const onFormSelected = useCallback((form: DataForm) => {
    dispatch(setActiveForm(form.form_content));
    setFormPickerAnchor(undefined);
  }, [dispatch]);

  const onSaveChanges = useCallback(() => {
    if (!fillableAlreadyExists(fillable.id)) {
      return;
    }

    setUpdating(true);
    supaClient.from<DataForm>("forms").update({
      form_content: fillable,
      updatedAt: new Date(Date.now())
    })
      .match({ id: fillable.id })
      .single()
      .then((value) => {
        setUpdating(false);
        if (!value.body) {
          toast.error("Erreur de sauvegarde");
          toast.error(value.error.message);
        }
      })
  }, [fillable, fillableAlreadyExists]);

  useEffect(() => {
    setSession(supaClient.auth.session());
    supaClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === "SIGNED_OUT") {
        alert("signed out");
      }
    })

    let user = supaClient.auth.user();

    if (!user) {
      return;
    }
  }, []);

  useEffect(() => {

    function handler(ev: globalThis.KeyboardEvent) {
      if ((ev.ctrlKey || ev.metaKey) && ev.key === 's') {
        ev.stopPropagation();
        ev.preventDefault();
        onSaveChanges();
      }
      else if ((ev.ctrlKey || ev.metaKey) && ev.key === 'N') {
        ev.stopPropagation();
        ev.preventDefault();
        setCreateOpen(true);
      }
      else if ((ev.ctrlKey || ev.metaKey) && ev.key === 'P') {
        ev.stopPropagation();
        ev.preventDefault();
        onPreview();
      }
    }

    document.addEventListener("keydown", handler, false);
    return () => {
      document.removeEventListener('keydown', handler);
    }

  }, [onSaveChanges, fillable, onPreview]);

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Logo size={24} />
        <h2>Polyfill.me</h2>
      </div>
      <div className={styles.actions}>
        <Box paddingX={1}>
          <Tooltip title={<span style={{ fontSize: '14px' }}>
            Nouveau formulaire (ctrl + shift + n)
          </span>
          }>
            <IconButton
              size="small"
              color="primary"
              onClick={() => setCreateOpen(true)}>
              <MdAdd size={16} color={theme.palette.primary.main} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box paddingX={1}>
          <Tooltip title={<span style={{ fontSize: '14px' }}>
            Enregistrer les changements (ctrl + s)
          </span>
          }>
            <IconButton
              disabled={updating}
              size="small"
              color="primary"
              onClick={onSaveChanges}>
              {updating ? <ClockLoader size={16} color={theme.palette.primary.main} /> : <MdSave size={16} color={theme.palette.primary.main} />}
            </IconButton>
          </Tooltip>
        </Box>
        <Box paddingX={1}>
          <Tooltip title={<span style={{ fontSize: '14px' }}>
            Paramètres du formulaire
          </span>
          }>
            <IconButton
              size="small"
              color="primary"
              onClick={() => setSettingsOpen(true)}>
              <MdSettings size={16} color={theme.palette.primary.main} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box paddingX={1}>
          <Tooltip title={<span style={{ fontSize: '14px' }}>
            Voir le rendu (ctrl + shift + p)
          </span>
          }>
            <IconButton
              size="small"
              color="primary"
              onClick={onPreview}>
              <MdVisibility size={16} color={theme.palette.primary.main} />
            </IconButton>
          </Tooltip>
        </Box>
        {forms.length > 0 && <Box paddingX={1}>
          <Button
            endIcon={<MdKeyboardArrowDown />}
            variant="outlined"
            color="primary"
            size="small"
            onClick={(ev) => setFormPickerAnchor(ev.currentTarget)}>
            {(fillable.title.length > 10 ? fillable.title.substr(0, 10) + "..." : fillable.title) || "Selectionner"}
          </Button>
          <Popover
            open={Boolean(formPickerAnchor)}
            onClose={() => setFormPickerAnchor(undefined)}
            elevation={1}
            anchorEl={formPickerAnchor}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}>
            {
              forms.map((f) => {
                return <MenuItem
                  key={f.id}
                  value={f.id}
                  onClick={() => onFormSelected(f)}>{f.form_content.title}</MenuItem>
              })
            }
          </Popover>
        </Box>}
      </div>
      <Box>
        {
          session && <Avatar style={{ background: 'white' }} onClick={(ev) => setProfileAnchor(ev.currentTarget)}>
            <MdPerson size={24} fill={grey[300]} />
          </Avatar>
        }
        {
          !session && <Button size="small" color="primary" variant="contained" disableElevation onClick={onAuthenticate}>Connectez-vous</Button>
        }
      </Box>
      <CreateFormDialog
        maxWidth="md"
        fullWidth
        onClose={() => setCreateOpen(false)}
        open={createOpen}
        onFormCreated={() => setCreateOpen(false)} />
      <FillableSettingsEditor
        fullScreen
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)} />
      {session && <Popover elevation={2} anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={() => setProfileAnchor(undefined)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Box minWidth="320px" padding={2}>
          <Box marginBottom={2}>
            <Typography variant="body1">{session.user.email}</Typography>
          </Box>
          <List dense disablePadding>
            <ListItem button onClick={() => router.push("/dashboard")}>
              <ListItemText primary="Tableau de bord" />
            </ListItem>
          </List>
        </Box>
      </Popover>}
    </header>
  )
}