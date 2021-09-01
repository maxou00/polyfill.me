import { Grid, Typography } from "@material-ui/core";
import { ColorPicker, Color } from "material-ui-color";
import { useCallback } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateDecoration } from "../../state/creator";
import { useFillable } from "../../state/selectors";

export function FillablePalette() {
    const fillable = useFillable();
    const dispatch = useDispatch();

    const palette = useMemo(() => {
        return fillable.decoration.palette;
    }, [fillable.decoration.palette]);

    const onPrimaryChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.primary = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onSecondaryChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.secondary = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onDefaultTextChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.defaultText = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onFillableTitleChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.fillable.title = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onFillableSubtitleChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.fillable.subtitle = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onPageTitleChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.page.title = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onPageSubtitleChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.page.subtitle = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onPageBackgroundChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.page.background = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onQuestionTitleChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.question.title = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onQuestionSubtitleChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.question.description = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onQuestionErrorChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.question.error = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    const onQuestionHelperChange = useCallback((color: Color) => {
        let nextDec = {...fillable.decoration};
        nextDec.palette.question.helper = `#${color.hex}`;
        dispatch(updateDecoration(nextDec));
    }, [fillable,dispatch]);

    if(!palette) {
        return <></>
    }

    return <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
        <Grid item xs={12}>
            <Typography variant="body1">Général</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur Principale</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.primary}
                disableAlpha
                disableTextfield
                onChange={onPrimaryChange}/>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur Secondaire</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.secondary}
                disableAlpha
                disableTextfield
                onChange={onSecondaryChange}
                />
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur par défault du texte</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.defaultText}
                disableAlpha
                disableTextfield
                onChange={onDefaultTextChange}
                />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="body1">Formulaire</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur du titre</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.fillable.title}
                disableAlpha
                disableTextfield
                onChange={onFillableTitleChange}/>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur du sous-titre</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.fillable.subtitle}
                disableAlpha
                disableTextfield
                onChange={onFillableSubtitleChange}
                />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="body1">Pages</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur du titre</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.page.title}
                disableAlpha
                disableTextfield
                onChange={onPageTitleChange}/>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur du sous-titre</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.page.subtitle}
                disableAlpha
                disableTextfield
                onChange={onPageSubtitleChange}
                />
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur l&apos;arrière-plan</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.page.background}
                disableAlpha
                disableTextfield
                onChange={onPageBackgroundChange}
                />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="body1">Questions</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur du titre</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.question.title}
                disableAlpha
                disableTextfield
                onChange={onQuestionTitleChange}/>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur de la description</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.question.description}
                disableAlpha
                disableTextfield
                onChange={onQuestionTitleChange}
                />
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur du message d&apos;erreur</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.question.error}
                disableAlpha
                disableTextfield
                onChange={onQuestionErrorChange}
                />
        </Grid>
        <Grid item xs={4}>
            <Typography variant="body2">Couleur du message d&apos;aide</Typography>
        </Grid>
        <Grid item xs={8}>
            <ColorPicker 
                value={palette.question.helper}
                disableAlpha
                disableTextfield
                onChange={onQuestionHelperChange}
                />
        </Grid>
    </Grid>
}