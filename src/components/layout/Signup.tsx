import { Container, Grid, TextField,Button } from "@mui/material";
import PasswordInput from "../reusable/PasswordInput";

export default function Signup(){
    return(
        <Container maxWidth='sm'>
            <Grid sx={{display: 'block'}}>
                <Grid md={12}>
                    <TextField id="filled-basic" label="Email" variant="filled" type="email" fullWidth/>
                </Grid>
                <Grid md={12}>
                    <PasswordInput label="Enter Password ..."/>
                </Grid>
                <Grid md={12}>
                    <PasswordInput label="Confirm Password ..."/>
                </Grid>
                <Grid md={12}>
                <Button variant="contained" size="medium" sx={{ marginTop: 1 }} fullWidth>
                    Create an Account
                </Button>
                </Grid>
            </Grid>
        </Container>
    )
}