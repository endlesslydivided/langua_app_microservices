import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(113,242,33) 0%,rgb(64,233,87) 50%,rgb(35,138,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(113,242,33) 0%,rgb(64,233,87) 50%,rgb(35,138,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(113,242,33) 0%, rgb(64,233,87) 50%, rgb(35,138,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(113,242,33) 0%, rgb(64,233,87) 50%, rgb(35,138,135) 100%)',
    }),
}));

interface FinishStepperProps {
    activeStep: number;
    icons: { [index: string]: React.ReactElement };
    steps: string[];
}

const FinishStepper: React.FC<FinishStepperProps> = ({
    activeStep,
    steps,
    icons,
}) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconComponent={({
                                completed,
                                active,
                                icon,
                                className,
                            }) => (
                                <ColorlibStepIconRoot
                                    ownerState={{ completed, active }}
                                    className={className}
                                >
                                    {icons[String(icon)]}
                                </ColorlibStepIconRoot>
                            )}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};

export default FinishStepper;
