import { useEffect, useState } from "react";
import { FiTrash, FiEdit, FiCheck } from "react-icons/fi";
import {api} from "./api";

interface TaskProps{
  id: string;
  description: string;
  date: string;
  status:boolean;
}

const [tasks, setTasks] = useState<TaskProps[]>([])

useEffect(() => {
  loadTasks();
})

async function loadTasks() {
  const response = await api.get("/task")
  setTasks(response.data)
   
  
}
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-rose-950 flex 
    justify-center px-4">
      <main className="my-10 w-full lg:max 5x1">
        <section>
          <h1 className="text-4x1 text-slate-200
          font-medium text-center">
            Lista de tarefas
          </h1>
          <form className="flex flex-col my-6">
            <label className="text-slate-200">Descrição tarefa</label>
            <input type="text" className="w-full mb-5 p-2 rounded" />
            <label className="text-slate-200">Data</label>
            <input type="date" className="w-full mb-5 p-2 rounded" />
            <input type="submit" value={"Adicionar"} className="cursor-pointer w-full bg-slate-800 font-medium text-slate-200 p-4" />
          </form>
        </section>

        <section className="mt-5 flex flex-col">
       {tasks.map((task)=> 
     <article
     className="w-full bg-slate-200 text-slate-800 p-2 rounded
   relative hover:bg-sky-300">
     <p>{task.description}</p>
     <p>{task.date}</p>
     <p>{task.status}</p>
     <button
       className="flex absolute right-14 -top-2 bg-green-400 w-7 h-7 
       items-center justify-center text-slate-200"> <FiCheck></FiCheck></button>

     <button
       className="flex absolute right-7 -top-2 bg-yellow-400 w-7 h-7 
       items-center justify-center text-slate-200"> <FiEdit></FiEdit></button>

<button
       className="flex absolute right-0 -top-2 bg-red-400 w-7 h-7 
       items-center justify-center text-slate-200"> <FiTrash></FiTrash></button>


   </article>
       )}
       
         
        </section>
      </main>
    </div>
  );
}
