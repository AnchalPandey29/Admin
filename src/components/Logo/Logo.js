// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/users/avatar-group.png';

const Logo = () => {
    const theme = useTheme();

    return (
        
        <>
            <img src={logo} alt="InvestUp" width="50" style={{marginLeft:"40px"}} />

           
        </>
    );
};

export default Logo;
