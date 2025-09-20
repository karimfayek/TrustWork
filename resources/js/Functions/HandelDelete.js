import {  router } from '@inertiajs/react';
export  const handleDelete = (e ,id , routeName) => {
    
    e.preventDefault();

    const confirmed = window.confirm("هل أنت متأكد أنك تريد الحذف  ");

    if (!confirmed) return; // المستخدم رفض

    console.log("Deleted item with ID:", id);
    router.post(
        route(routeName),
        { id }, {
            preserveScroll: true,
           

        }
    );
  
};