import {  router } from '@inertiajs/react';
export  const handleDelete = (e ,id , routeName) => {
    
    e.preventDefault();

    const confirmed = window.confirm("هل أنت متأكد أنك تريد الحذف  ");

    if (!confirmed) return; // المستخدم رفض

    router.post(
        route(routeName),
        { id }, {
            preserveScroll: true,
           

        }
    );
  
};