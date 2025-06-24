
import { handleDelete } from '@/Functions/HandelDelete';

export default function DeleteButton({ id , routeName}){
    console.log(routeName , 'routename')
    return(
        <button
        onClick={(e) => handleDelete (e, id,routeName )}
          
            className="inline-block bg-red-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
        >
            مسح
        </button>
    )
}