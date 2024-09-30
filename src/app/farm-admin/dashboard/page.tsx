"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { Users, Map, Search, Sprout } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Sample data for charts
const profileViewsData = [
  { date: '2023-09-22', views: 45 },
  { date: '2023-09-23', views: 52 },
  { date: '2023-09-24', views: 49 },
  { date: '2023-09-25', views: 60 },
  { date: '2023-09-26', views: 55 },
  { date: '2023-09-27', views: 58 },
  { date: '2023-09-28', views: 65 },
];

const visitorLocationData = [
  { name: '0-5 miles', value: 30 },
  { name: '5-10 miles', value: 25 },
  { name: '10-20 miles', value: 20 },
  { name: '20-50 miles', value: 15 },
  { name: '50+ miles', value: 10 },
];

const productSearchData = [
  { name: 'Tomatoes', searches: 120 },
  { name: 'Cucumbers', searches: 95 },
  { name: 'Lettuce', searches: 80 },
  { name: 'Carrots', searches: 70 },
  { name: 'Peppers', searches: 60 },
];

const visitorInterestsData = [
  { name: 'Organic Produce', value: 40 },
  { name: 'Farm-to-Table', value: 30 },
  { name: 'Seasonal Fruits', value: 15 },
  { name: 'Dairy Products', value: 10 },
  { name: 'Honey', value: 5 },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [selectedMetric, setSelectedMetric] = useState<string>('views');

  const renderChart = () => {
    switch (selectedMetric) {
      case 'views':
        return (
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Daily Profile Views</CardTitle>
              <CardDescription>Number of profile views per day</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profileViewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'location':
        return (
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Visitor Locations</CardTitle>
              <CardDescription>
                Distance of visitors from your farm
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={visitorLocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {visitorLocationData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'products':
        return (
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Product Searches</CardTitle>
              <CardDescription>
                Most searched products when your farm was viewed
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productSearchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="searches" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'interests':
        return (
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Visitor Interests</CardTitle>
              <CardDescription>
                Other interests of visitors who viewed your farm
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={visitorInterestsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {visitorInterestsData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-12 bg-white shadow-lg rounded-xl mt-10 mb-10">
      <h1 className="text-4xl font-extrabold text-center text-green-800 mb-10">
        Farm Profile Insights
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Overview</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="views">Profile Views</SelectItem>
              <SelectItem value="location">Visitor Locations</SelectItem>
              <SelectItem value="products">Product Searches</SelectItem>
              <SelectItem value="interests">Visitor Interests</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Profile Views</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">384</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last period
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Avg. Visitor Distance</CardTitle>
            <Map className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 miles</div>
            <p className="text-xs text-muted-foreground">
              -2.3 miles from last period
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Top Searched Product</CardTitle>
            <Search className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomatoes</div>
            <p className="text-xs text-muted-foreground">
              120 searches this period
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Top Visitor Interest</CardTitle>
            <Sprout className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Organic Produce</div>
            <p className="text-xs text-muted-foreground">
              40% of visitors interested
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="hidden sm:block">
        <Tabs
          value={selectedMetric}
          onValueChange={setSelectedMetric}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="views">Profile Views</TabsTrigger>
            <TabsTrigger value="location">Visitor Locations</TabsTrigger>
            <TabsTrigger value="products">Product Searches</TabsTrigger>
            <TabsTrigger value="interests">Visitor Interests</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {renderChart()}
    </div>
  );
};

export default Dashboard;
