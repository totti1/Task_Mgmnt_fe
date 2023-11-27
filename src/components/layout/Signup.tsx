import { Container, Grid, TextField,Button, CircularProgress } from "@mui/material";
import PasswordInput from "../reusable/PasswordInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { clearState, signupUser } from "../../slices/UserSlice";

export default function Signup(){
    const [values, setValues] = useState({
        email: '',
        password: '',
        password2: '',
    });
    const { 
        isFetching,
        message, 
        isError, 
        isRegistered
        // errorMessage 
    } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = { 
            email: values.email, 
            password: values.password, 
            password2: values.password 
        }
        dispatch(signupUser(data));
        // navigate('/products');
      };
    
    
      useEffect(() => {
        if (isRegistered) {
          navigate('/');
          dispatch(clearState());
        }
        if (isError) {
          dispatch(clearState());
        }
      }, [dispatch, navigate,isError, message])
    return(
        <Container maxWidth='sm'>
            <Grid container spacing={2} sx={{display: 'block'}}>
                <Grid item sm={12}>
                    <TextField 
                        label="Email" 
                        name="email" 
                        variant="filled" 
                        type="email" 
                        fullWidth 
                        value={values.email} 
                        onChange={handleChange('email')} 
                    />
                </Grid>
                <Grid item sm={12}>
                    <PasswordInput label="Enter Password ..." value={values.password} onChange={handleChange('password')}/>
                </Grid>
                <Grid item sm={12}>
                    <PasswordInput label="Confirm Password ..." value={values.password2} onChange={handleChange('password2')}/>
                </Grid>
                <Grid item sm={12}>
                <Button variant="contained" size="medium" sx={{ marginTop: 1 }} fullWidth onClick={handleSubmit} >
                    {isFetching ? <CircularProgress />: "Create an Account"}
                </Button>
                </Grid>
            </Grid>
        </Container>
    )
}