// resources/js/Components/Navbar.js

import React from 'react';
import { Link } from '@inertiajs/react';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl">
                    <Link href="/" className="font-semibold">Employee Project Manager</Link>
                </div>
                <div className="space-x-4">
                    <Link
                        href={route('admin.dashboard')}
                        className="text-white hover:text-gray-300"
                    >
                        Projects
                    </Link>
                    <Link
                        href={route('tasks.index')}
                        className="text-white hover:text-gray-300"
                    >
                        Tasks
                    </Link>
                    <Link
                        href={route('tasks.index')}
                        className="text-white hover:text-gray-300"
                    >
                        Employees
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
