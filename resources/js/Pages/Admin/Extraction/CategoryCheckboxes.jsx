// resources/js/Pages/CategoryCheckboxes.jsx
import React, { useState } from 'react';

const CategoryCheckboxes = ({delevery , subject , notes}) => {
    const checkboxes = [
         'MEP – (MEP)', 'Infrastructure – (INFRA)',
        'Fire Protection – (FF)', 'Survey – (SURV)', 'Light Current – (E-L.C)',
        'General – (GEN)', 'Active', 'Passive' 
    ];
     const checkboxesStatus = [
       '(A) Approved' , '(B) Approved as Noted' ,'(C) Revise and Resubmit','(D) Rejected'
    ];
       const checkboxesAtts = [
       'Hard Copy' , 'Soft Copy' 
    ];

    // تقسيمها لـ 3 أعمدة (كل عمود فيه 5)
    const columns = [
        checkboxes.slice(0, 2),
        checkboxes.slice(2, 4),
        checkboxes.slice(4, 6),
        checkboxes.slice(6, 8),
    ];
      const columnsStatus = [
        checkboxesStatus.slice(0, 5)
    ];
          const columnsAtt = [
        checkboxesAtts.slice(0, 5)
    ];

    const [selected, setSelected] = useState([]);
    const [status, setStatus] = useState([]);
    const [atts, setAtts] = useState([]);

    const toggleCheckbox = (label) => {
        setSelected((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };
      const toggleCheckboxStatus = (label) => {
        setStatus((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };
        const toggleCheckboxAtts = (label) => {
        setAtts((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    return (
        <div dir='ltr'>
           
            <div className="mb-6 border border-gray-400 rounded p-4 print:hidden">
                <h2 className="text-lg font-bold mb-4">اختر العناصر:</h2>
                <div className="grid grid-cols-4 gap-4">
                    {columns.map((column, colIndex) => (
                        <div key={colIndex}>
                            {column.map((label, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`${label}`}
                                        checked={selected.includes(label)}
                                        onChange={() => toggleCheckbox(label)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`${label}`}>{label}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <hr />
                 <h2 className="text-lg font-bold mb-4">اختر الحاله:</h2>
                <div className="grid grid-cols-3 gap-4">
                    {columnsStatus.map((columnst, colIndexs) => (
                        <div key={colIndexs}>
                            {columnst.map((label, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`${label}`}
                                        checked={status.includes(label)}
                                        onChange={() => toggleCheckboxStatus(label)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`${label}`}>{label}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <hr />
                 <h2 className="text-lg font-bold mb-4">اختر المرفقات:</h2>
                <div className="grid grid-cols-3 gap-4">
                    {columnsAtt.map((att, colIndexs) => (
                        <div key={colIndexs}>
                            {att.map((label, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`${label}`}
                                        checked={atts.includes(label)}
                                        onChange={() => toggleCheckboxAtts(label)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`${label}`}>{label}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {delevery === 'ir' &&
            <div className='border-4 border-black p-2  border-b-0 text-left flex'>
                <b className='mb-3 mr-10'>Subject: </b>
                <b>{subject}</b>
            </div>
            }

            {/* الجدول */}
               <div className='border-4 border-black p-2 border-b-0  text-left'>
                <b className='mb-3 underline'>Attachements : </b>
               
            </div>
            <div className='border-4 border-black p-2 border-b-0  text-left flex justify-around'>
                
                 {columnsAtt.map((columnsA, colIndex) => (
                    <React.Fragment>

                        {columnsA.map((label, index) => (
                           
                    <div  className='flex gap-4 items-center'key={colIndex}>
                            <p>{label}</p>
                            <div
                            style={{height:20 , width:40}} 
                                key={index}
                                className={`p-2 border  ${atts.includes(label)
                                        ? 'bg-blue-200'
                                        : 'bg-white'}`}
                            >
                               
                            </div></div>
                        ))}
                    </React.Fragment>
                    ))}
               
              

            </div>
            <div className="border-4 border-black rounded p-4">
                <div className="grid grid-cols-9 gap-4">
                    {/* العمود الأول للكلمة Category */}
                    <div className="flex items-center justify-center font-bold text-lg">
                        Category
                    </div>

                    {/* الأعمدة الثلاثة الباقية */}
                    {columns.map((column, colIndex) => (
                        <div key={colIndex} className='col-span-2'>
                            {column.map((label, index) => (
                                <div
                                    key={index}
                                    className={`p-2 border mb-2 ${
                                        selected.includes(label)
                                            ? 'bg-blue-200'
                                            : 'bg-white'
                                    }`}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className='border-4 border-black p-2 border-t-0  text-left'>
                <b className='mb-3'>Note </b>
                <ul className='list'>
                    <li>. The Works Requested For Inspection Has Been Reviewd For Compliance With The Construction Documents Prior To This Request For Inspection.</li>
                    <li>· Previouse Inspection Request(S) Are Required To Be Attached if the inspection dosn’t the 1st</li>
                </ul>
            </div>
             <div className='border-4 border-black p-2 border-t-0  text-left'>
                <b className='mb-3 underline'>Action Code Legend: </b>
               
            </div>
            <div className='border-4 border-black p-2 border-t-0  text-left flex justify-around'>
                
                 {columnsStatus.map((columnst, colIndex) => (
                    <React.Fragment>

                        {columnst.map((label, index) => (
                           
                    <div  className='flex gap-4 items-center'key={colIndex}>
                            <p>{label}</p>
                            <div
                            style={{height:20 , width:40}} 
                                key={index}
                                className={`p-2 border  ${status.includes(label)
                                        ? 'bg-blue-200'
                                        : 'bg-white'}`}
                            >
                               
                            </div></div>
                        ))}
                    </React.Fragment>
                    ))}
               
              

            </div>
              <div className='border-4 border-black p-2 border-t-0  text-left'>
                <b className='mb-3'>Notes: </b>
                <ul className='list ml-12'>
                    <li>§ Production, supply and /or implementation shall proceed only when action code is A / or B.</li>
                    <li>§ Regarding action code C, resubmittal shall be within the limit set in the contract.</li>
                    <li>§ Review does not relieve the contractor from responsibility of compliance with all requirments of contract documents.</li>
                    <li>§ If rejected please see comments</li>
                </ul>
            </div>
             <div className={`border-4 border-black p-2 border-t-0  text-left ${notes && 'flex'}`}>
                <h2 className="text-lg font-semibold mb-2 mr-10">Comments:</h2>
            <div className="space-y-3">
                {notes ?
            <b>
                {notes}
            </b>  
            :  
            <React.Fragment>

                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="border-b border-dotted border-gray-400 w-full h-5"
                    ></div>
                ))}
            </React.Fragment>
            }
            </div>
            </div>
               <div className='border-4 border-black p-2 border-t-0  text-left'>
                <b className='mb-3'>Noted By: </b>
                <table className='min-w-full border border-gray-300 text-sm mt-2'>
                    <tbody>

                    <tr>
                        <td className='border-2 border-black p-2'>Name:</td>
                        <td className='border-2 border-black p-2'>Date:</td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black p-2" colSpan={2}>Signature:</td>
                    </tr>
                    </tbody>
                </table>
            </div>
                     <div className='border-4 border-black p-2 border-t-0  text-left'>
                <b className='mb-3'>Received by contractor : </b>
                <table className='min-w-full border border-gray-300 text-sm mt-2'>
                    <tbody>

                    <tr>
                        <td className='border-2 border-black p-2'>Name:</td>
                        <td className='border-2 border-black p-2'>Date:</td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black p-2" colSpan={2}>Signature:</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryCheckboxes;
