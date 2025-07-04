// Admin/RecycleBin.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

export default function RecycleBin({ projects , users}) {
  const handleRestoreProject = (id) => {
    router.post(`/admin/recycle-bin/restore/project/${id}`);
  };

  const handleForceDeleteProject = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر نهائيًا؟')) {
        router.post(route('admin.recyclebin.forceDelete.project' , id));
    }
  };
  const handleRestoreUser = (id) => {
    router.post(`/admin/recycle-bin/restore/user/${id}`);
  };

  const handleForceDeleteUser = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر نهائيًا؟')) {
        router.post(route('admin.recyclebin.forceDelete.user' , id));
    }
  };
  return (
    <AuthenticatedLayout>
    <div className="p-4 bg-slate-50">
      <h1 className="text-xl font-bold mb-4 text-center">سلة المهملات</h1>
    <h2 className='mb-4'>المشاريع المحذوفة</h2>
      {projects.length === 0 && <p>لا توجد عناصر محذوفة.</p>}

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <span>{project.name || item.title || `عنصر #${project.id}`}</span>

            <div className="space-x-2">
              <button
                onClick={() => handleRestoreProject(project.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                استعادة
              </button>
              <button
                onClick={() => handleForceDeleteProject(project.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                حذف نهائي
              </button>
            </div>
          </li>
        ))}
      </ul>
<hr  className='my-4'/>
      <h2 className='mb-4'>المستخدمين المحذوفين</h2>
      {users.length === 0 && <p>لا توجد عناصر محذوفة.</p>}

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <span>{user.name || item.title || `عنصر #${user.id}`}</span>

            <div className="space-x-2">
              <button
                onClick={() => handleRestoreUser(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                استعادة
              </button>
              <button
                onClick={() => handleForceDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                حذف نهائي
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </AuthenticatedLayout>
  );
}
