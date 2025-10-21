import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const allNavLinks = [
        { label: 'المشاريع', routeName: 'admin.dashboard', roles: ['admin', 'proj', 'tech', 'acc'] },
        { label: 'المهام', routeName: 'tasks.index', roles: ['admin', 'proj'] },
        { label: 'الزيارات', routeName: 'admin.visits.index', roles: ['admin'] },
        { label: 'الموظفين', routeName: 'users.index', roles: ['admin', 'acc', 'hr'] },
        { label: 'الحضور', routeName: 'attendance.list', roles: ['admin', 'acc', 'proj', 'hr'] },
        { label: 'الأجازات الرسمية', routeName: 'holidays.index', roles: ['admin', 'acc', 'hr'] },
        { label: 'العهد ', routeName: 'admin.advance.list', roles: ['admin', 'acc'] },
        { label: 'السلف ', routeName: 'admin.loans.index', roles: ['admin', 'acc'] },
        { label: 'المكافئات', routeName: 'rewards.index', roles: ['admin', 'acc', 'hr'] },
        { label: 'الادوات', routeName: 'tools.index', roles: ['admin', 'acc', 'hr'] },
        { label: 'ادارة الادوات', routeName: 'admin.tool-assignments', roles: ['admin', 'acc', 'hr'] },
        { label: 'العملاء', routeName: 'customers.index', roles: ['admin', 'acc', 'hr'] },
        { label: 'المخزن', routeName: 'items.index', roles: ['admin', 'acc'] },
        { label: 'التقارير', routeName: 'reports.index', roles: ['admin'] },
        { label: 'سلة المحذوفات', routeName: 'admin.recyclebin', roles: ['admin'] },
    ];
    const user = usePage().props.auth.user;
    const userRoles = user?.rolesnames ?? []; // مثلا ['admin', 'proj']

    // هات اللينكات اللي اي رول من رولز اليوزر موجود في roles بتاعتها
    const roleLinks = allNavLinks.filter(link =>
        link.roles.some(role => userRoles.includes(role))
    );

    // تصنيف الروابط في مجموعات
    const groupedNavLinks = [
        {
            label: 'المشاريع',
            items: [
                { label: 'المشاريع', routeName: 'admin.dashboard', roles: ['admin', 'proj', 'tech', 'acc'] },
                { label: 'المهام', routeName: 'tasks.index', roles: ['admin', 'proj'] },
            ],
        },
        {
            label: 'الأدوات',
            items: [
                { label: 'الادوات', routeName: 'tools.index', roles: ['admin', 'acc', 'hr'] },
                { label: 'ادارة الادوات', routeName: 'admin.tool-assignments', roles: ['admin', 'acc', 'hr'] },
            ],
        },
      
        {
            label: 'الموظفين',
            items: [ 
                { label: 'الموظفين', routeName: 'users.index', roles: ['admin', 'acc', 'hr'] },
                { label: 'الحضور', routeName: 'attendance.list', roles: ['admin', 'acc', 'proj', 'hr'] },
                { label: 'الأجازات الرسمية', routeName: 'holidays.index', roles: ['admin', 'acc', 'hr'] },
                 { label: 'العهد ', routeName: 'admin.advance.list', roles: ['admin', 'acc'] },
                { label: 'المكافئات', routeName: 'rewards.index', roles: ['admin', 'acc', 'hr'] }, 
                { label: 'السلف', routeName: 'admin.loans.index', roles: ['admin', 'acc', 'hr'] },
                
            ],
        },
          
        
        {
        label: 'المخزن',
        items:[
            { label: 'داش بورد', routeName: 'items.dashboard', roles: ['admin' , 'acc'] },     
            { label: 'الاصناف', routeName: 'items.index', roles: ['admin' , 'acc'] },
        ],
        },
    ];

    // روابط فردية خارج المجموعات
    const singleNavLinks = [
        { label: 'الزيارات', routeName: 'admin.visits.index', roles: ['admin'] },
        { label: 'العملاء', routeName: 'customers.index', roles: ['admin', 'acc', 'hr'] },
        { label: 'سلة المحذوفات', routeName: 'admin.recyclebin', roles: ['admin'] },
        { label: 'التقارير', routeName: 'reports.index', roles: ['admin'] },

    ];

    const { props } = usePage();

    const [notifications, setNotifications] = useState([])
    const [showNotifications, setShowNotifications] = useState(false)
    const successMessage = props.flash.message;
    const errorMessages = props.errors;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    /* useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/admin/fetch-notifications`
                );
                const data = await response.json();
                setNotifications(data)
                
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };
    
        fetchData();
    }, []); */

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white print:hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden sm:flex items-center justify-center gap-8 ms-10">
                                {/* عرض القوائم المنسدلة للمجموعات */}
                                {groupedNavLinks.map(group => {
                                    // تحقق من وجود صلاحية لأي عنصر في المجموعة
                                    const visibleItems = group.items.filter(link =>
                                        link.roles.some(role => userRoles.includes(role))
                                    );
                                    if (visibleItems.length === 0) return null;
                                    return (
                                        <Dropdown key={group.label} >
                                            <Dropdown.Trigger>
                                                <span className="inline-flex items-center rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                                                    {group.label}
                                                    <svg
                                                        className="ms-1 h-4 w-4 text-gray-500"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 20"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                                        />
                                                    </svg>
                                                </span>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                {visibleItems.map(link => (
                                                    <Dropdown.Link
                                                        key={link.routeName}
                                                        href={route(link.routeName)}
                                                        active={route().current(link.routeName)}
                                                    >
                                                        {link.label}
                                                    </Dropdown.Link>
                                                ))}
                                            </Dropdown.Content>
                                        </Dropdown>
                                    );
                                })}
                                {/* عرض الروابط الفردية */}
                                {singleNavLinks.filter(link =>
                                    link.roles.some(role => userRoles.includes(role))
                                ).map(link => (
                                    <NavLink
                                        key={link.routeName}
                                        href={route(link.routeName)}
                                        active={route().current(link.routeName)}
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                           . الملف الشخصى
                                        </Dropdown.Link>

                                        {['admin'].some(role => userRoles?.includes(role)) &&

                                            <ResponsiveNavLink
                                                href={route('settings')}
                                                className='text-blue-600'
                                                active={route().current('settings')}
                                            >
                                                الاعدادات
                                            </ResponsiveNavLink>
                                        }
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className='text-red-600'
                                        >
                                            تسجيل الخروج
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            {/* Notification bell */}
                            <div className="relative me-4">
                                <button
                                    onClick={() => setShowNotifications(prev => !prev)}
                                    className="relative inline-flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 00-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>

                                    {notifications.length > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
                                            {notifications.length}
                                        </span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-64 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                                        <div className="max-h-64 overflow-y-auto py-2 text-sm text-gray-700">
                                            {notifications.length > 0 ? (
                                                notifications.map((n, i) => (
                                                    <div key={i} className="px-4 py-2 hover:bg-gray-100">
                                                        {n.message}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-center text-gray-500">لا توجد إشعارات</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            {/* Notification icon for mobile */}
                            <div className="me-3 flex sm:hidden">
                                <button
                                    onClick={() => setShowNotifications(prev => !prev)}
                                    className="relative inline-flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 00-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                    {notifications.length > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
                                            {notifications.length}
                                        </span>
                                    )}
                                </button>
                            </div>

                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                الملف الشخصى
                            </ResponsiveNavLink>
                            {roleLinks.map(({ label, routeName }) => (
                                <ResponsiveNavLink
                                    key={routeName}
                                    href={route(routeName)}
                                    active={route().current(routeName)}
                                >
                                    {label}
                                </ResponsiveNavLink>
                            ))}
                            {['admin'].some(role => userRoles?.includes(role)) &&

                                <ResponsiveNavLink

                                    href={route('settings')}
                                    className='text-blue-600'
                                    active={route().current('settings')}
                                >
                                    الاعدادات
                                </ResponsiveNavLink>
                            }
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className='text-red-600'
                            >
                                تسجيل الخروج
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>

                <>
                    {successMessage && (
                        <div className="bg-green-100 text-green-800 border border-green-300 p-2 rounded mt-4">
                            {successMessage}
                        </div>
                    )}

                    {Object.entries(errorMessages).length > 0 && (
                        <div className="bg-red-100 text-red-800 border border-red-300 p-2 rounded mt-4">

                            {Object.entries(errorMessages).map(([field, message]) => (
                                <div key={field}>
                                    {field}: {message}
                                </div>
                            ))}
                        </div>
                    )}
                    {props.errors.message && (
                        <div className="bg-red-100 text-green-800 border text-center p-2 rounded mt-4">
                            {props.errors?.message}
                        </div>
                    )}
                </>
                {children}
            </main>
        </div>
    );
}
