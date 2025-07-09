import React from 'react';
import {
  Card, CardContent, Typography, Grid, Box, Avatar
} from '@mui/material';
import DnsIcon from '@mui/icons-material/Dns';

function ServerCard({ server }) {
  const isOffline = server.users === "0" && server.quarantine !== "-";
  const formatMemory = (kb) => {
    const value = parseInt(kb, 10);
    if (value >= 1024 * 1024) {
      return `${(value / (1024 * 1024)).toFixed(2)} GB`;
    } else if (value >= 1024) {
      return `${(value / 1024).toFixed(2)} MB`;
    } else {
      return `${value} KB`;
    }
  };
  return (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: isOffline ? 'error.main' : '#1976d2', mr: 2 }}>
            <DnsIcon />
          </Avatar>
          <Typography variant="h6">{server.server}</Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2">Conexões: {server.connections}</Typography>
            <Typography variant="body2">Quarentena: {server.quarantine}</Typography>
            <Typography variant="body2">Standby: {server.standby}</Typography>
            <Typography variant="body2">Usuários: {server.users}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Threads: {server.threads}</Typography>
            <Typography variant="body2">Memória: {formatMemory(server.memory)}</Typography>
            <Typography variant="body2">CPU: {server.cpu}%</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ServerCard;
