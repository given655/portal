import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
  Divider,
  Stack,
  Tooltip,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Security = () => {
  const [twoFA, setTwoFA] = useState(true);
  const [ipRestriction, setIpRestriction] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(false);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Security Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Account Protection
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={twoFA}
                  onChange={() => setTwoFA(!twoFA)}
                  color="primary"
                />
              }
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SecurityIcon color="primary" />
                  <span>Enable Two-Factor Authentication (2FA)</span>
                </Stack>
              }
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Access Control
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={ipRestriction}
                  onChange={() => setIpRestriction(!ipRestriction)}
                  color="primary"
                />
              }
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <GppMaybeIcon color="warning" />
                  <span>Restrict Access by IP</span>
                </Stack>
              }
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Notifications
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={loginAlerts}
                  onChange={() => setLoginAlerts(!loginAlerts)}
                  color="primary"
                />
              }
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <NotificationsActiveIcon color="info" />
                  <span>Send Login Alerts via Email</span>
                </Stack>
              }
            />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Security;
