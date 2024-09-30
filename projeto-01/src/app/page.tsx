"use client"
import { FormEvent, useEffect, useRef, useState } from "react";
import { FiTrash, FiEdit, FiCheck } from "react-icons/fi";
import { api } from "./api";
import { Asul } from "next/font/google";

interface TaskProps {
  id: string;
  description: string;
  date: string;
  status: boolean;
}


export default function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([])

  const descriptionRef = useRef<HTMLInputElement | null>(null)

  const dataRef = useRef<HTMLInputElement | null>(null)


  useEffect(() => {
    readTasks();
  })
  async function readTasks() {
    const response = await api.get("/task")
  }

  async function createTask(event: FormEvent) {
    event.preventDefault()
    const response = await api.post("/task", {
      description: descriptionRef.current?.value,
      date: dataRef.current?.value
    })

    setTasks(allTasks => [...allTasks, response.data])
  }

  async function deleteTask(id: string) {
    try {
      await api.delete("/task", {
        params: {
          id: id
        }
      })
      const allTasks = tasks.filter((task) => task.id !== id)
      setTasks(allTasks)

    } catch (err) {
      alert(err)
    }

  }
  async function setTaskDone(id: String) {
    try {
      const response = await api.put("/task", { params: { id: id }, status: true })
      setTasks(response.data)
    }

    catch (err) { alert(err) }

  }
  return (
    <div className="w-full min-h-screen bg-rose-950 flex 
    justify-center px-4">
      <main className="my-10 w-full lg:max 5x1">
        <section>
          <h1 className="text-4x1 text-slate-200
          font-medium text-center">
            Lista de tarefas
          </h1>
          <form className="flex flex-col my-6" onSubmit={createTask}>
            <label className="text-slate-200">Descrição tarefa</label>
            <input type="text" className="w-full mb-5 p-2 rounded" ref={descriptionRef} />
            <label className="text-slate-200">Data</label>
            <input type="date" className="w-full mb-5 p-2 rounded" ref={dataRef} />
            <input type="submit" value={"Adicionar"} className="cursor-pointer w-full bg-slate-800 font-medium text-slate-200 p-4" />
          </form>
        </section>

        <section className="mt-5 flex flex-col">
          {tasks.map((task) =>
            <article
              className="w-full bg-slate-200 text-slate-800 p-2 rounded
   relative hover:bg-sky-300" key={task.id}>
              <p>{task.description}</p>
              <p>{task.date}</p>
              <p>{task.status}</p>
              <button
                className="flex absolute right-14 -top-2 bg-green-400 w-7 h-7 
       items-center justify-center text-slate-200" onClick={() => setTaskDone(task.id)}> <FiCheck></FiCheck></button>

              <button
                className="flex absolute right-0 -top-2 bg-red-400 w-7 h-7 
       items-center justify-center text-slate-200" onClick={() => deleteTask(task.id)}> <FiTrash></FiTrash></button>


            </article>
          )}


        </section>
      </main>
    </div>
  );
}
