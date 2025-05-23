import React from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  TextField,
  Button,
  Paper,
  useTheme,
} from '@mui/material';

const Settings = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600} color="primary">
        Settings
      </Typography>

      <Paper
        elevation={3}
        sx={{
          mt: 3,
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.mode === 'light' ? '#f9f9f9' : 'background.paper',
        }}
      >
        {/* General Settings */}
        <Typography variant="h6" gutterBottom fontWeight={500}>
          General
        </Typography>

        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Notifications"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={<Switch />}
          label="Auto Sync Data"
          sx={{ mb: 3 }}
        />

        <Divider sx={{ my: 3 }} />

        {/* Account Settings */}
        <Typography variant="h6" gutterBottom fontWeight={500}>
          Account
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
          defaultValue="admin@example.com"
        />

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          defaultValue="admin"
        />

        <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          Save Changes
        </Button>

        <Divider sx={{ my: 4 }} />

        {/* Danger Zone */}
        <Typography variant="h6" gutterBottom fontWeight={500} color="error">
          Danger Zone
        </Typography>

        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 1, borderRadius: 2 }}
        >
          Delete Account
        </Button>
      </Paper>
    </Box>
  );
};

export default Settings;
