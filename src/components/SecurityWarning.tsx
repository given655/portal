// frontend/src/components/SecurityWarning.tsx
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export const SecurityWarning = () => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        severity="warning"
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>Restricted Access</AlertTitle>
        This system contains sensitive JAB information. Your user ID, IP address, 
        and activities are being recorded for security purposes. Any unauthorized 
        access or use is strictly prohibited.
      </Alert>
    </Collapse>
  );
};