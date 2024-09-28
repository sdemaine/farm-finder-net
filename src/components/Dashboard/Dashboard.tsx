import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { Users, Map, Search, Sprout } from 'lucide-react';

const Dashboard = () => {
    const [timeRange, setTimeRange] = useState('7d');
    const [selectedMetric, setSelectedMetric] = useState('views');

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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const renderChart = () => {
        switch (selectedMetric) {
            case 'views':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Profile Views</CardTitle>
                            <CardDescription>Number of profile views per day</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={profileViewsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                );
            case 'location':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Visitor Locations</CardTitle>
                            <CardDescription>Distance of visitors from your farm</CardDescription>
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
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {visitorLocationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Searches</CardTitle>
                            <CardDescription>Most searched products when your farm was viewed</CardDescription>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Visitor Interests</CardTitle>
                            <CardDescription>Other interests of visitors who viewed your farm</CardDescription>
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
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {visitorInterestsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-3xl font-bold mb-6">Farm Profile Insights</h1>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                <h2 className="text-xl font-semibold">Overview</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger>
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
                        <SelectTrigger>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Profile Views</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">384</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last period
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Visitor Distance</CardTitle>
                        <Map className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.5 miles</div>
                        <p className="text-xs text-muted-foreground">
                            -2.3 miles from last period
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Searched Product</CardTitle>
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Tomatoes</div>
                        <p className="text-xs text-muted-foreground">
                            120 searches this period
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Visitor Interest</CardTitle>
                        <Sprout className="h-4 w-4 text-muted-foreground" />
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
                <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="space-y-4">
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