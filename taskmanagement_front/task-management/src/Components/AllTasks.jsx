import React from 'react'
import { deleteTask } from '../Services/allApis'
import { useState,useEffect } from 'react'
import { allTasks } from '../Services/allApis'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import EditTask from './EditTask'


function AllTasks() {


    const[allTtask,setAllTtask]=useState([])
    const [search,setSearch]=useState("")

    

    // task id for path parameter
    const {tid}=useParams()

    useEffect(()=>{
       
        getData()
    },[search])
    


    const getData=async()=>{
        const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
        const result=await allTasks(header,search)
        // console.log(result)
        if(result.status==200){
            setAllTtask(result.data)
        }
        else{
            console.log(result.response.data)
        }
    }


    const handleDelete=async(id)=>{
        const token=(sessionStorage.getItem('token'))
        console.log(id)
        const header={
          "Content-Type":"application/json",
           "Authorization":`Bearer ${token}`
        }
        const result=await deleteTask(id,header)
          if(result.status==200){
            console.log(result)
            toast.success("recipe deleted successfully")
            getData()
          }
          else{
            console.log(result)
            toast.error(res.response.data)
          }
        
      }

      
    // const [taskData, setTaskData] = useState({
    //     taskTitle: "", description: "", date: "", important: false, isCompleted: false
    // })

    // // to toggle complete button
    // const toggleDone = async (id, currentStatus) => {
    //     const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    //     const newStatus = !currentStatus;
    //     const result = await updateCompletion(id, { done: newStatus }, header)
    //     if (result.status === 200) {
    //         setTaskData({
    //             ...taskData, isCompleted: newStatus
    //         })
    //         setAddStatus(result)
    //     }
    //     else {
    //         console.log(result)
    //         toast.error(result.response.data)
    //     }
    // }
  
  return (
   <>

        <div className='d-flex justify-content-end p-5 '>
        <input type="text" name='' className='form-control w-25' placeholder='search Tasks'  id=''  onChange={(e)=>{setSearch(e.target.value)}} style={{fontSize:'20px'}}/>
        </div>
      
            <div className='border border-3 p-3'>
        {
            allTtask.length>0?
            allTtask.map(item=>(
                <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded'>
                     <Link to={`/details/${item._id}`} style={{textDecoration:'none'}}>
                     <h4>{item.taskTitle}</h4>
                     </Link>
               

                {/* <div >
                          {
                               !item.done ?
                                 <button onClick={() => toggleDone(item._id, item.isCompleted)} className='btn btn-outline-primary'>Not Done</button>
                                     :
                                 <button onClick={() => toggleDone(item._id, item.isCompleted)} className='btn btn-primary'>
                                      Done
                                  <span className='ms-2'><i class="fa-regular fa-square-check" style={{ color: '#ffffff' }}></i></span>
                                 </button>
                           }
                         </div> */}
                          
                <div>
                
                   <EditTask task={item}/> 
                 
                  <button className='btn mt-3'  onClick={()=>{handleDelete(item?._id)  }}>
                  <i class="fa-solid fa-trash fa-xl" style={{color:" #3267c3"}} />
                  </button>
                </div>
              </div>
            ))
            :
            <h3 className='text-center '> No tasks</h3>
        }
      </div>
    
   </>
  )
}

export default AllTasks