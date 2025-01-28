import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Alert } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useWebSocket } from '../../services/websocket';

const Dashboard = () => {
  const { isConnected, ...wsData } = useWebSocket();
  const [deploymentHistory, setDeploymentHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Update deployment history with new data
  useEffect(() => {
    if (wsData.recentDeployments.length > 0) {
      const newDeployment = wsData.recentDeployments[0];
      setNotifications(prev => [{
        message: `New deployment ${newDeployment.status}: ${newDeployment.service}`,
        severity: newDeployment.status === 'success' ? 'success' : 'error',
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 4)]);
    }
  }, [wsData.recentDeployments]);

  return (
    <Container sx={{ mt: 4 }}>
      {/* Connection Status */}
      <Box sx={{ mb: 3 }}>
        <Alert 
          severity={isConnected ? "success" : "warning"}
          sx={{ mb: 1 }}
        >
          {isConnected ? "Connected to real-time updates" : "Connecting to server..."}
        </Alert>
      </Box>

      {/* Notifications */}
      <Box sx={{ mb: 3 }}>
        {notifications.map((notification, index) => (
          <Alert 
            key={index} 
            severity={notification.severity}
            sx={{ mb: 1 }}
          >
            {notification.message}
          </Alert>
        ))}
      </Box>

      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Live Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="primary">Total Deployments</Typography>
            <Typography variant="h3">{wsData.deployments}</Typography>
            <Typography variant="body2" color="text.secondary">
              Live Updates
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">Success Rate</Typography>
            <Typography variant="h3">{wsData.successRate.toFixed(1)}%</Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time calculation
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="info.main">Active Services</Typography>
            <Typography variant="h3">{wsData.activeServices}</Typography>
            <Typography variant="body2" color="text.secondary">
              Currently monitoring
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Deployments */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Deployments</Typography>
            <Box>
              {wsData.recentDeployments.map((deployment, index) => (
                <Box 
                  key={deployment.id} 
                  sx={{ 
                    py: 1, 
                    borderBottom: index !== wsData.recentDeployments.length - 1 ? 1 : 0, 
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="body2">
                    {deployment.service} - {deployment.status}
                    <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                      {new Date(deployment.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;