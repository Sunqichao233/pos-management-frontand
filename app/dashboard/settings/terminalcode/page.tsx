'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    ArrowRight,
    SearchIcon,
    ChevronDownIcon,
    GridIcon,
    RowsIcon,
    Ellipsis,
    Plus,
    InfoIcon,
} from 'lucide-react';

const deviceCodes = [
    { id: '1', code: "Harry's-2", location: "Harry's", status: 'Paired' },
    { id: '2', code: "Harry's-1", location: "Harry's", status: 'Paired' },
];

export default function TerminalCodePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredDevices = deviceCodes.filter(device =>
        device.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="p-2 mr-2 text-gray-600 hover:bg-gray-100">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Device codes</h1>
                </div>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create
                </Button>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded-md mb-8">
                <div className="flex items-start">
                    <InfoIcon className="h-5 w-5 mr-3 mt-1" />
                    <div>
                        <p className="font-semibold">
                            Your access to Square for Restaurants on unlimited devices ends in 25 days. Add your credit card details to avoid losing access to those devices.
                        </p>
                        <a href="#" className="font-medium text-blue-600 hover:underline">
                            Add credit card information
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <div className="relative w-64">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search device code name"
                            className="pl-9 pr-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="text-gray-700 hover:bg-gray-100 space-x-1">
                        <span>Location</span>
                        <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="text-gray-700 hover:bg-gray-100 space-x-1">
                        <span>Status</span>
                        <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 space-x-1">
                        Customize
                    </Button>
                    <Button variant="outline" className="p-2 border-gray-300 bg-gray-100">
                        <RowsIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" className="p-2 border-gray-200">
                        <GridIcon className="h-5 w-5 text-gray-400" />
                    </Button>
                </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
                        <tr>
                            <th className="p-4 w-12">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            </th>
                            <th className="p-4">Device code</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 w-16"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDevices.length > 0 ? (
                            filteredDevices.map(device => (
                                <tr key={device.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 w-12">
                                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="p-4 flex items-center space-x-2">
                                        <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                                        <span className="font-medium text-gray-900">{device.code}</span>
                                    </td>
                                    <td className="p-4 text-gray-600">{device.location}</td>
                                    <td className="p-4">
                                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                                            {device.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="ghost" className="p-2">
                                            <Ellipsis className="h-5 w-5 text-gray-600" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-gray-500">
                                    No devices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Results per page 10</span>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="p-2">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="p-2">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}