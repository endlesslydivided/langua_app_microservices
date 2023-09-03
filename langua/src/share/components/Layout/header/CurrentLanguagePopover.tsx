import countries from '@/assets/countriers';
import useAuth from '@/share/hooks/useAuth';
import { Person } from '@mui/icons-material';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import {
    Box,
    ListItemIcon,
    MenuItem,
    Popover,
    Stack,
    Theme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CurrentLanguagePopover() {
    const [open, setOpen] = useState<Element | null>(null);
    const { auth: user, setCurrentVocabulary } = useAuth();
    const router = useRouter();
    const handleOpen = (event: React.SyntheticEvent) => {
        setOpen(event.currentTarget);
    };

    const handleClose = (event: React.SyntheticEvent) => {
        setOpen(null);
    };

    const handleProfile = () => {
        setOpen(null);
        setCurrentVocabulary(null);
    };

    const iconButtonSx = open
        ? {
              '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme: Theme) =>
                      alpha(theme.palette.grey[900], 0.8),
              },
          }
        : {};

    const currentLanguage = countries.find(
        (i) => i.language === user.currentVocabulary?.language,
    );
    const currentNativeLanguage = countries.find(
        (i) => i.language === user.currentVocabulary?.vocabularyNativeLanguage,
    );

    return (
        <>
            <Box
                onClick={handleOpen}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    cursor: 'pointer',
                    alignItems: 'center',
                }}
            >
                <Image
                    className="border-red-800 border-5 border-solid"
                    loading="lazy"
                    loader={({ src }) => src}
                    height={10}
                    width={20}
                    alt="language"
                    src={`https://flagcdn.com/w20/${currentLanguage?.alpha2.toLowerCase()}.png`}
                />{' '}
                {currentLanguage?.language + ' -> '}
                <Image
                    loading="lazy"
                    loader={({ src }) => src}
                    height={10}
                    width={20}
                    alt="nativeLanguage"
                    src={`https://flagcdn.com/w20/${currentNativeLanguage?.alpha2.toLowerCase()}.png`}
                />
                {currentNativeLanguage?.language}
            </Box>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Stack sx={{ p: 1 }}>
                    <MenuItem key={'Change vocabulary'} onClick={handleProfile}>
                        <ListItemIcon>
                            <SwitchAccessShortcutIcon fontSize="small" />
                        </ListItemIcon>
                        Change vocabulary
                    </MenuItem>
                </Stack>
            </Popover>
        </>
    );
}
