import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/VpnKey';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

import LicenseKeys from '../components/LicenseKeys';
import Security from '../components/Security';
import Settings from '../components/Settings';

const drawerWidth = 260;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('license');
  const theme = useTheme();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'license':
        return <LicenseKeys />;
      case 'security':
        return <Security />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  const logout = () => {
    console.log('Logging out...');
  };

  const navItems = [
    { key: 'license', label: 'License Keys', icon: <KeyIcon /> },
    { key: 'analytics', label: 'Trading Analytics', icon: <BarChartIcon /> },
    { key: 'security', label: 'Security', icon: <SecurityIcon /> },
    { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: drawerWidth,
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(18,18,18,0.85)',
          backdropFilter: 'blur(12px)',
          borderRight: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1200,
          boxShadow: 3,
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700} color="primary">
            JAB
          </Typography>
          <Typography variant="caption" color="text.secondary">
            v2.4.1 • Admin Console
          </Typography>
        </Box>

        <Divider />

        {/* Navigation */}
        <List sx={{ flexGrow: 1, mt: 1 }}>
          {navItems.map((tab) => {
            const isActive = activeTab === tab.key;
                return (
      <ListItem
        key={tab.key}
        component="div"
        button
        onClick={() => setActiveTab(tab.key)}
        sx={{
          mx: 1,
          my: 0.5,
          borderRadius: 2,
          transition: 'all 0.2s',
          color: isActive ? 'white' : 'text.primary',
          backgroundColor: isActive ? 'primary.main' : 'transparent',
          borderLeft: isActive ? '5px solid white' : '5px solid transparent',
          '&:hover': {
            backgroundColor: isActive ? 'primary.dark' : 'action.hover',
          },
          '& .MuiListItemIcon-root': {
            color: isActive ? 'white' : 'inherit',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          {tab.icon}
        </ListItemIcon>
        <ListItemText primary={tab.label} />
      </ListItem>

            );
          })}
        </List>

        <Divider />

        {/* Logout */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{ borderRadius: 2 }}
          >
            Sign Out
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          p: 4,
          overflowY: 'auto',
        }}
      >
        {renderActiveTab()}
      </Box>
    </Box>
  );
};

export default Dashboard;
