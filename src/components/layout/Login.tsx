import { Button, CircularProgress, Container, Grid, TextField } from "@mui/material";
import PasswordInput from "../reusable/PasswordInput";
import { clearState, loginUser } from "../../slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";

export default function Login(){
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const { 
        isFetching, 
        isSuccess, 
        message, 
        isError, 
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
        }
        dispatch(loginUser(data));
    
      };
      useEffect(() => {
        if (isSuccess) {
          dispatch(clearState());
          alert(message)
          navigate('/');
        }
    
        if (isError) {
          dispatch(clearState());
        }
      }, [dispatch, navigate, isSuccess, isError, loginUser, message]);
    
    return(
        <Container maxWidth='sm'>
            <Grid container sx={{display: 'block'}}>
                <Grid item md={12}>
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
                <Grid item md={12}>
                    <PasswordInput label="Enter Password ..." value={values.password} onChange={handleChange('password')}/>
                </Grid>
                <Grid item md={12}>
                <Button variant="contained" size="medium" sx={{ marginTop: 1 }} fullWidth onClick={handleSubmit} >
                    {isFetching ? <CircularProgress />: "Login"}
                </Button>
                </Grid>
            </Grid>
        </Container>
    )
}