import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ServerCard from '../../components/ServerCard';
import ResumoStatus from '../../components/ResumoStatus';
import AppBarMenu from '../../components/AppBar';

const INTERVAL_OPTIONS = {
  '1 segundo': 1000,
  '5 segundos': 5000,
  '30 segundos': 30000,
  '1 minuto': 60000,
  '5 minutos': 300000,
  '10 minutos': 600000,
};

function Home({ iconeMenu }) {
  const [data, setData] = useState(null);
  const [intervalLabel, setIntervalLabel] = useState(() => {
    return localStorage.getItem('updateIntervalLabel') || '30 segundos';
  });

  // Atualização periódica dos dados
  useEffect(() => {
  const fetchData = () => {
    fetch('/totvs_broker_query')
      .then(res => res.text())
      .then(raw => {
        // Corrigir vírgula antes de fechar array
        let fixed = raw.replace(/},\s*]/g, '}]');

        // Corrigir campo "total": que vem como string JSON
        fixed = fixed.replace(/"total"\s*:\s*"({[^"]+})"/, (_, obj) => {
          const parsed = JSON.parse(obj.replace(/\\?"/g, '"'));
          return `"total": ${JSON.stringify(parsed)}`;
        });

        return JSON.parse(fixed);
      })
      .then(setData)
      .catch(err => console.error('Erro ao buscar dados:', err));
  };

    fetchData();
    const intervalId = setInterval(fetchData, INTERVAL_OPTIONS[intervalLabel]);

    return () => clearInterval(intervalId);
  }, [intervalLabel]);

  if (!data) return <Typography p={4}>Carregando...</Typography>;

  const { date, time, servers, total } = data;

  return (
    <>
      <AppBarMenu iconeMenu={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Atualizar</InputLabel>
          <Select
            value={intervalLabel}
            label="Atualizar"
            onChange={(e) => {
              const value = e.target.value;
              setIntervalLabel(value);
              localStorage.setItem('updateIntervalLabel', value);
            }}
          >
            {Object.keys(INTERVAL_OPTIONS).map((label) => (
              <MenuItem key={label} value={label}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {iconeMenu}
      </Box>
    } />
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Monitoramento - {date} às {time}
      </Typography>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Servidores</Typography>
        <Grid container spacing={2}>
          {servers.map((srv, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <ServerCard server={srv} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Resumo</Typography>
        <ResumoStatus servers={servers} total={total} />
      </Box>
    </Box>

    </>
  );
}

export default Home;
