import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

function ResumoStatus({ servers, total }) {
  const totalServidores = servers.length;
  const ativos = servers.filter(s => s.users !== "0" && s.quarantine === "-").length;
  const standby = servers.filter(s => s.standby !== "0").length;
  const quarentena = servers.filter(s => s.quarantine !== "-").length;

  const cards = [
    { label: 'Servidores', value: totalServidores },
    { label: 'Ativos', value: ativos },
    { label: 'Standby', value: standby },
    { label: 'Quarentena', value: quarentena },
    { label: 'Sessões', value: total.sessoes },
    { label: 'Usuários', value: total.usuarios },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {cards.map((item, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center',width:100}}>
            <Typography variant="h6">{item.value}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default ResumoStatus;
