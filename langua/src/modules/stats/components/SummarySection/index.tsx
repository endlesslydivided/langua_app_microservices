'use client';

import { fShortenNumber } from '@/share/utils/formatNumber';
import { Card, Palette, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { FC } from 'react';

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}));

interface SummaryWidgetProps {
    color?: string;
    icon: any;
    title: string;
    total?: number;
    sx?: object;
}

const SummarySection: FC<SummaryWidgetProps> = ({
    title,
    total = 0,
    icon,
    color = 'primary',
    sx,
    ...other
}) => {
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) =>
                    (theme.palette as Palette | any)[color].darker,
                bgcolor: (theme) =>
                    (theme.palette as Palette | any)[color].lighter,
                ...sx,
            }}
            {...other}
        >
            <StyledIcon
                sx={{
                    color: (theme) =>
                        (theme.palette as Palette | any)[color].dark as string,
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${alpha(
                            (theme.palette as Palette | any)[color].dark,
                            0,
                        )} 0%, ${alpha(
                            (theme.palette as Palette | any)[color].dark,
                            0.24,
                        )} 100%)`,
                }}
            >
                {icon}
            </StyledIcon>

            <Typography variant="h3">{fShortenNumber(total) || 0}</Typography>

            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {title}
            </Typography>
        </Card>
    );
};

export default SummarySection;
