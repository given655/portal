import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  ChipProps,
} from '@mui/material';
import axios from 'axios';

type LicenseKeyStatus = 'Active' | 'Expired' | 'Revoked';

interface LicenseKey {
  key: string;
  user: string;
  bot: string;
  status: 'Active' | 'Expired' | 'Revoked';
  createdAt: string;
  expiresAt: string;
  mentorId: string;
  botType: string;
}

const statusColor: Record<LicenseKeyStatus, ChipProps['color']> = {
  Active: 'success',
  Expired: 'default',
  Revoked: 'error',
};

const LicenseKeys = () => {
  const [keys, setKeys] = useState<LicenseKey[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expiryOption, setExpiryOption] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchExistingKeys();
  }, []);

  const fetchExistingKeys = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5276/api/keys/all', {
        withCredentials: true,
      });
      
      setKeys(response.data);
    } catch (err) {
      setError('Failed to fetch license keys. Please try again.');
      console.error('Error fetching keys:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (keyId: string, index: number) => {
    try {
      await axios.patch(`http://localhost:5276/api/keys/revoke?key=${keyId}`, {}, {
        withCredentials: true,
      });
      setKeys(prev =>
        prev.map((k, i) => (i === index ? { ...k, status: 'Revoked' } : k))
      );
      setSuccess('License key revoked successfully');
    } catch (err) {
      setError('Failed to revoke license key');
      console.error('Error revoking key:', err);
    }
  };

  const filterKeys = () => {
    return keys.filter(k =>
      k.key.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === '' || k.status === filterStatus)
    );
  };

  const generateKey = async () => {
    try {
      const response = await axios.get(`http://localhost:5276/api/keys/generate-key?expiry=${expiryOption}`, {
       
        withCredentials: true,
      });

      setKeys(prev => [...prev, response.data]);
      setDialogOpen(false);
      setExpiryOption('');
      setSuccess('License key generated successfully');
    } catch (err) {
      setError('Failed to generate license key');
      console.error("Error generating license key:", err);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          License Key Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setDialogOpen(true)}
          sx={{ minWidth: 150 }}
        >
          Generate Key
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} mb={3} sx={{ maxWidth: 800 }}>
        <TextField
          label="Search by Key"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
            <MenuItem value="Revoked">Revoked</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <Paper elevation={2} sx={{ overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.default' }}>
                <TableCell sx={{ fontWeight: 600 }}>Key</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Mentor ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Bot Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Issued</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Expiry</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterKeys().length > 0 ? (
                filterKeys().map((row, i) => (
                  <TableRow key={row.key} hover>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{row.key}</TableCell>
                    <TableCell>{row.user || row.mentorId}</TableCell>
                    <TableCell>{row.bot || row.botType	}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={statusColor[row.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(row.createdAt)}</TableCell>
                    <TableCell>{formatDate(row.expiresAt)}</TableCell>
                    <TableCell align="right">
                      {row.status !== 'Revoked' && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleRevoke(row.key, i)}
                        >
                          Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No license keys found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Generate Key Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Generate New License Key</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Expiry Duration</InputLabel>
            <Select
              value={expiryOption}
              label="Expiry Duration"
              onChange={(e) => setExpiryOption(e.target.value)}
            >
              <MenuItem value="1w">1 Week</MenuItem>
              <MenuItem value="1m">1 Month</MenuItem>
              <MenuItem value="3m">3 Months</MenuItem>
              <MenuItem value="6m">6 Months</MenuItem>
              <MenuItem value="1y">1 Year</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={generateKey}
            variant="contained"
            disabled={!expiryOption}
          >
            Generate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbars */}
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LicenseKeys;