import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Activity, Clock, AlertTriangle } from 'lucide-react';

const Monitoring = () => {
  // Sample monitoring data
  const performanceData = [
    { timestamp: '00:00', responseTime: 120, errors: 2, deployments: 1 },
    { timestamp: '04:00', responseTime: 132, errors: 1, deployments: 0 },
    { timestamp: '08:00', responseTime: 125, errors: 0, deployments: 2 },
    { timestamp: '12:00', responseTime: 140, errors: 3, deployments: 1 },
    { timestamp: '16:00', responseTime: 128, errors: 1, deployments: 0 },
    { timestamp: '20:00', responseTime: 122, errors: 0, deployments: 1 },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'High CPU usage detected', time: '2 mins ago' },
    { id: 2, type: 'error', message: 'Deployment failed', time: '15 mins ago' },
    { id: 3, type: 'info', message: 'New deployment initiated', time: '1 hour ago' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Activity className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">System Status</p>
                <p className="text-xl font-bold">Healthy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-xl font-bold">127ms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <div className="h-64">
              <LineChart width={500} height={200} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="responseTime" stroke="#3B82F6" name="Response Time" />
                <Line type="monotone" dataKey="errors" stroke="#EF4444" name="Errors" />
                <Line type="monotone" dataKey="deployments" stroke="#10B981" name="Deployments" />
              </LineChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.type === 'error' ? 'bg-red-500' :
                      alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <span>{alert.message}</span>
                  </div>
                  <span className="text-sm text-gray-500">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Monitoring;