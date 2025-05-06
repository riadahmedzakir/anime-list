import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AppBar, Box, FormControl, IconButton, InputAdornment, OutlinedInput, Toolbar, Typography } from "@mui/material";
import { JSX, useState } from "react";
import { useLock } from './../../hooks/useLockContext';

const TopBar = (): JSX.Element => {
    const [isPasswordInputVisible, setIsPasswordInputVisible] = useState<boolean>(false);
    const { locked, setLocked } = useLock();
    const [hash] = useState<string>(`79e69c28b2482314ff41879a5ef4f43f1b7dfba52f5a5fce714bc647da754863`);

    const handlePasswordToggle = () => {
        setIsPasswordInputVisible(prev => {
            return !prev
        })
    }

    const hashPassword = async (password: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
    };

    const handlePassword = async (e: any) => {
        if (e.key === 'Enter') {
            const value = e.target.value;

            const hashedInput = await hashPassword(value);
            if (hashedInput === hash) {
                setLocked(false);
                setIsPasswordInputVisible(false);
            }
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent" sx={{ boxShadow: 1 }}>
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon color="primary" />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Anime List
                    </Typography>


                    {
                        isPasswordInputVisible ?
                            <FormControl
                                variant="standard"
                                size="small"
                                sx={{
                                    paddingRight: '10px'
                                }}
                            >
                                <OutlinedInput
                                    id="unlock"
                                    type="password"
                                    onKeyDown={handlePassword}
                                    endAdornment={
                                        <InputAdornment position="start">
                                            <IconButton edge="end">
                                                <VisibilityOffIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl> : null
                    }

                    {
                        locked ?
                            <LockOutlinedIcon onClick={handlePasswordToggle} /> :
                            <LockOpenIcon onClick={handlePasswordToggle} />
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;