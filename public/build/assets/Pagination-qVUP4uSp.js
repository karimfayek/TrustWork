import{j as t,L as s}from"./app-CuU5X9XV.js";function o({links:r}){return t.jsx("div",{className:"flex items-center space-x-1 mt-4 flex-wrap p-5 mx-auto justify-center",children:r.map((e,a)=>t.jsx(s,{href:e.url||"#",preserveState:!0,preserveScroll:!0,dangerouslySetInnerHTML:{__html:e.label},className:`
                        px-3 py-1 border rounded text-sm
                        ${e.active?"bg-blue-500 text-white":"hover:bg-gray-200"}
                        ${e.url?"":"opacity-50 pointer-events-none"}
                    `},a))})}export{o as P};
