import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material';
import * as React from 'react';

interface PasswordInterface{
    label: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInput(props: PasswordInterface){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
    return (
        <FormControl sx={{ marginTop: 1 }} variant="filled"fullWidth>
          <InputLabel htmlFor="filled-adornment-password">{props.label}</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={props.onChange}
          />
        </FormControl>
    )
}