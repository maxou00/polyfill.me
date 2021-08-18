import styles from '../styles/TopAppBar.module.scss'
import { MdAdd, MdKeyboardArrowDown, MdPerson, MdSave, MdVisibility } from 'react-icons/md';
import { Avatar, Box, Button, IconButton, MenuItem, Popover, Tooltip, useTheme } from '@material-ui/core';
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
import { setActiveFillable } from '../state/creator';
import { useFillable } from '../state/selectors';
import { ClockLoader } from 'react-spinners';
import { setActiveForm } from '../state/middlewares';

export default function TopAppBar() {
  const [session, setSession] = useState<Supabase.Session>();
  const [createOpen, setCreateOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [forms, setForms] = useState<DataForm[]>([]);
  const [formPickerAnchor, setFormPickerAnchor] = useState<HTMLButtonElement>();

  const fillable = useFillable();
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();

  const onAuthenticate = useCallback(() => {
    router.push("/auth/signin");
  }, [router]);

  const fillableAlreadyExists = useCallback((id: string) => {
    return Boolean(forms.find((f) => f.id === id));
  }, [forms]);

  const appendForm = useCallback((form: DataForm) => {
    let cpy = [...forms];
    let index = cpy.findIndex((f) => f.id === form.id);

    if (index >= 0) {
      cpy[index] = form;
    }
    else {
      cpy.push(form);
    }

    setForms(cpy);

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
    supaClient
      .from<DataForm>("forms")
      .select("id,form_content")
      .order("updatedAt", {ascending: false})
      .then((values) => {
        if (values.error) {
          return toast.error("Erreur de recupération de vos formulaires");
        }
        setForms(values.body);
        if (values.body.length > 0) {
          dispatch(setActiveForm(values.body[0].form_content));
        }
        else {
          setCreateOpen(true);
        }
      })

    let subscription = supaClient.from<DataForm>("forms").on("INSERT", (ev) => {
      dispatch(setActiveForm(ev.new.form_content));
      appendForm(ev.new);
    })
      .on("UPDATE", (ev) => {
        appendForm(ev.new);
      }).subscribe();

    return () => {
      supaClient.removeSubscription(subscription);
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
        window.open(`http://localhost:5000/preview/$${fillable.id}`, "_blank");
      }
    }

    document.addEventListener("keydown", handler, false);
    return () => {
      document.removeEventListener('keydown', handler);
    }

  }, [onSaveChanges, fillable]);

  return (
    <header className={styles.header}>
      <h2>Polyfill.me</h2>
      <div className={styles.actions}>
        <Box paddingX={1}>
          <Tooltip title={<span style={{ fontSize: '14px' }}>
            Nouveau formulaire (ctrl + shift + n)
          </span>
          }>
            <IconButton
              size="medium"
              color="primary"
              onClick={() => setCreateOpen(true)}>
              <MdAdd size={18} color={theme.palette.primary.main} />
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
              size="medium"
              color="primary"
              onClick={onSaveChanges}>
              {updating ? <ClockLoader size={18} color={theme.palette.primary.main} /> : <MdSave size={18} color={theme.palette.primary.main} />}
            </IconButton>
          </Tooltip>
        </Box>
        <Box paddingX={1}>
          <Tooltip title={<span style={{fontSize: '14px'}}>
            Voir le rendu (ctrl + shift + p)
          </span>
          }>
            <IconButton
              size="medium"
              color="primary">
              <MdVisibility size={18} color={theme.palette.primary.main} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box paddingX={1}>
          <Button
            endIcon={<MdKeyboardArrowDown />}
            variant="contained"
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
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
            {
              forms.map((f) => {
                return <MenuItem
                  key={f.id}
                  value={f.id}
                  onClick={() => onFormSelected(f)}>{f.form_content.title}</MenuItem>
              })
            }
          </Popover>
        </Box>
        {
          session && <Avatar style={{ background: 'white' }}>
            <MdPerson size={24} fill={grey[300]} />
          </Avatar>
        }
        {
          !session && <Button size="small" color="primary" variant="contained" disableElevation onClick={onAuthenticate}>Connectez-vous</Button>
        }
      </div>
      <CreateFormDialog
        maxWidth="md"
        fullWidth
        onClose={() => setCreateOpen(false)}
        open={createOpen}
        onFormCreated={() => setCreateOpen(false)} />
    </header>
  )
}