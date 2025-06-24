import AttFrom from '@/Pages/Employee/Att/AttForm';
import AttList from '@/Pages/User/AttList';
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
export default function AttReport({ atts, visits, users, projects }) {
    const [selectedProjectId, setSelectedProjectId] = useState('all');
    return (
        <ReportLayout>
            <AttList atts= {atts} visits={visits} users={users} projects={projects} showManual={false} />
            </ReportLayout>
    );
}
