import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    IconButton,
    SvgIconTypeMap,
} from '@mui/material';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import React from 'react';

interface FabDialogProps {
    children?: React.ReactNode;
    buttonTitle?: string;
    dialogTitle?: string;
    buttonIcon?: React.ReactNode;
    dialogText?: string;
}
const FabDialog: React.FC<FabDialogProps> = ({
    children,
    buttonTitle,
    dialogTitle,
    buttonIcon,
    dialogText,
}) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Fab
                variant="extended"
                onClick={handleClickOpen}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    margin: '25px',
                }}
            >
                {buttonIcon}
                {buttonTitle}
            </Fab>
            <Dialog fullWidth open={open} onClose={handleClose}>
                {dialogTitle ? <DialogTitle>{dialogTitle}</DialogTitle> : null}
                {dialogText ? (
                    <DialogContentText>{dialogText}</DialogContentText>
                ) : null}

                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </>
    );
};

export default FabDialog;
