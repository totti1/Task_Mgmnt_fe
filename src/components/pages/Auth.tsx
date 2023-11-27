import { Box, Container } from "@mui/material";
import BasicTab from "../reusable/BasicTab";
import Login from "../layout/Login";
import Signup from "../layout/Signup";

export default function Auth(){
    return(
        <div>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <BasicTab 
                        login={<Login />}
                        signup={<Signup />}
                    />
                </Box>
            </Container>
        </div>
    )
};