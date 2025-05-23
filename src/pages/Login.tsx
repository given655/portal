import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Alert,
  Paper,
  Stack,
  LinearProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  LockOutlined, 
  Security as SecurityIcon,
  HelpOutline,
  Visibility,
  VisibilityOff 
} from '@mui/icons-material';

const Login = () => {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password, mfaToken);
    } catch (err) {
      if (err instanceof Error && err.message === 'MFA_REQUIRED') {
        setRequiresMfa(true);
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Paper elevation={6} sx={{ 
        p: 4, 
        mt: 4,
        borderRadius: 2,
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #ffffff 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          position: 'relative'
        }}>
          <Box sx={{
            bgcolor: 'primary.main',
            p: 1.5,
            borderRadius: '50%',
            mb: 2,
            boxShadow: 3
          }}>
            <SecurityIcon sx={{ 
              fontSize: 40, 
              color: 'common.white' 
            }} />
          </Box>
          
          <Typography component="h1" variant="h4" sx={{ 
            mb: 2,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: 'primary.main'
          }}>
            JAB Admin
          </Typography>

          <Alert severity="warning" icon={false} sx={{ 
            width: '100%', 
            mb: 3,
            borderLeft: '4px solid',
            borderColor: 'warning.main',
            bgcolor: 'warning.light',
            '& .MuiAlert-message': {
              width: '100%'
            }
          }}>
            <Typography variant="body2" fontWeight="medium">
              <Box component="span" sx={{ color: 'error.main' }}>SECURITY NOTICE:</Box> This 
              system contains protected information. All activities are logged and monitored 
              in accordance with JAB security policy.
            </Typography>
          </Alert>

          {isLoading && <LinearProgress sx={{ width: '100%', mb: 2 }} />}

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              mt: 1, 
              width: '100%',
              position: 'relative'
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <LockOutlined sx={{ 
                    color: 'action.active', 
                    mr: 1, 
                    fontSize: 20 
                  }} />
                )
              }}
              inputProps={{
                'aria-label': 'Enter your authorized JAB credentials',
                'data-testid': 'username-input'
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
              inputProps={{
                'aria-label': 'Enter your security passphrase (minimum 16 characters)',
                'data-testid': 'password-input',
                minLength: 16
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
            
            {requiresMfa && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="mfaToken"
                label="Verification Code"
                type="text"
                id="mfaToken"
                value={mfaToken}
                onChange={(e) => setMfaToken(e.target.value)}
                inputProps={{
                  'aria-label': 'Enter your 6-digit authentication code',
                  'data-testid': 'mfa-input',
                  maxLength: 6,
                  pattern: '\\d{6}'
                }}
                helperText="Enter code from your authenticator app"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            )}

            {error && (
              <Alert severity="error" sx={{ 
                mt: 2,
                '& .MuiAlert-icon': {
                  alignItems: 'center'
                }
              }}>
                <Typography variant="body2">
                  {error === 'MFA_REQUIRED' 
                    ? 'Secondary verification required: Please enter your MFA code' 
                    : 'Authentication failed: Verify your credentials and try again'}
                </Typography>
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              startIcon={<LockOutlined />}
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5,
                borderRadius: 1,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 0.5,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  bgcolor: 'primary.dark'
                }
              }}
            >
              {isLoading ? 'Verifying Credentials...' : 'Authenticate'}
            </Button>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                <Box component="span" sx={{ opacity: 0.7 }}>
                   Secure Portal
                </Box>
              </Typography>
              
              <Tooltip title="JAB Security Assistance" arrow>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <HelpOutline fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ textDecoration: 'underline dotted' }}>
                      donald.mxolisi@outlook.com
                    </Box>
                  </Typography>
                </Stack>
              </Tooltip>
            </Stack>
          </Box>
        </Box>
      </Paper>
      
      
    </Container>
  );
};

export default Login;