import { Box, Grid, MenuItem, TextField, Typography } from "@material-ui/core"

export const FieldConditionComposer = ({ page: Page, field: ContentField }) => {
    return <Box>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">Conditions</Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField variant="outlined" size="small" select fullWidth>
                    <MenuItem value="eq">Egalité</MenuItem>
                    <MenuItem value="regex">Correspondance</MenuItem>
                    <MenuItem value="gt">Stricte supériorité</MenuItem>
                    <MenuItem value="gte">Supériorité ou égalité</MenuItem>
                    <MenuItem value="lt">Stricte infériorité</MenuItem>
                    <MenuItem value="lte">Infériorité ou égalité</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField variant="outlined" size="small" fullWidth />
            </Grid>
        </Grid>
    </Box>
}