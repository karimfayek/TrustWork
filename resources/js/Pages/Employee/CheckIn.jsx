import React, { useState } from 'react';

const AttendanceCheckIn = () => {
  const [attendanceType, setAttendanceType] = useState('visit');
  const [selectedProject, setSelectedProject] = useState('');
  const [note, setNote] = useState('');

  const handleCheckIn = () => {
    console.log('Checked in:', {
      type: attendanceType,
      project: selectedProject,
      note,
    });
    // send to backend via axios or form submit
  };

  const projectOptions = [
    { id: 1, name: 'مشروع تطوير الموقع' },
    { id: 2, name: 'مشروع CRM للعميل' },
  ];

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">تسجيل الحضور</h2>

        <div className="space-y-2 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="attendanceType"
              value="visit"
              checked={attendanceType === 'visit'}
              onChange={() => setAttendanceType('visit')}
            />
            <span>زيارة ميدانية</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="attendanceType"
              value="project"
              checked={attendanceType === 'project'}
              onChange={() => setAttendanceType('project')}
            />
            <span>حضور لمشروع</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="attendanceType"
              value="office"
              checked={attendanceType === 'office'}
              onChange={() => setAttendanceType('office')}
            />
            <span>حضور في الشركة</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="attendanceType"
              value="remote"
              checked={attendanceType === 'remote'}
              onChange={() => setAttendanceType('remote')}
            />
            <span>عمل من المنزل</span>
          </label>
        </div>

        {attendanceType === 'project' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">اختر المشروع</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">اختر المشروع</option>
              {projectOptions.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="note" className="block mb-1 font-medium text-gray-700">ملاحظات (اختياري)</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="اكتب أي ملاحظة تتعلق بالحضور"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          onClick={handleCheckIn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          تسجيل الحضور
        </button>
      </div>
    </div>
  );
};

export default AttendanceCheckIn;