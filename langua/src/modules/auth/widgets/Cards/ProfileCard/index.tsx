'use client'

import useAuth from "@/share/hooks/useAuth";
import EditProfileForm from "../../Forms/EditProfileForm";
import { Avatar, Box, Divider, FormControlLabel, Switch, Typography, useTheme } from "@mui/material";
import { StyledAccount } from "@/share/components/Layout/nav";
import { identicon } from "@/share/utils/createIdenticon";
import useColorMode from "@/share/hooks/useColorMode";


export default function getProfileCard() {


  const {auth} = useAuth();
  const {toggleColorMode} = useColorMode()
  const theme = useTheme()

  return (
    <Box sx={{gap:'15px', display:'flex',flexDirection:'column', mb: 2.5, mx: 2.5}}>

      <StyledAccount>

          <Avatar src={identicon(auth.user?.userContacts?.email)}alt="photoURL"/>


          <Box sx={{ml: 2}}>
              <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                  {`${auth.user?.firstname} ${auth.user?.surname}`}
              </Typography>


          </Box>
      </StyledAccount>
      
      <Divider sx={(theme) => ({
        color:theme.palette.text.secondary
      })} component="div" role="presentation" orientation="horizontal" textAlign="left">Edit profile</Divider>

      <EditProfileForm/>

      <Divider sx={(theme) => ({
        color:theme.palette.text.secondary
      })} component="div" role="presentation" orientation="horizontal" textAlign="left">Theme</Divider>


      <FormControlLabel label={theme.palette.mode === 'light' ? 'Light' : 'Dark'} control={
        <Switch  value={theme.palette.mode === 'light'} onChange={()=> toggleColorMode()}/>
      }  />

     

    </Box>
  );
}
