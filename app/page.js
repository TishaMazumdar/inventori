"use client";

import PantryItem from "@/components/PantryItem";
import { useState, useContext } from "react";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import AddItemModal from "@/components/modals/AddItemModal";
import { pantryContext } from "@/lib/store/pantry-context";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import SignIn from "@/components/SignIn";
import { authContext } from "@/lib/store/auth-context";



export default function Home() {

  const [showAddModal, setShowAddModal] = useState(false)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)

  const { category } = useContext(pantryContext)
  const { user } = useContext(authContext)

  if (!user) {
    return <SignIn />
  }

  return (
    <>
      {/*Add Income Modal*/}
      <AddItemModal show={showAddModal} onClose={setShowAddModal} />
      <AddCategoryModal show={showAddCategoryModal} onClose={setShowAddCategoryModal} />

      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section>
          <small className="text-gray-500">
            INVENTORI 
          </small>
        </section>

        <section className="flex items-center gap-3 py-2">
          <button onClick={() => { setShowAddCategoryModal(true) }} className="btn btn-primary">+ Add Item</button>
          <button onClick={() => { setShowAddModal(true) }} className="btn btn-primary-outline">+ Shopping List</button>
        </section>

        {/*My Pantry*/}
        <section className="py-6">
          <h3 className="text-2xl">My Pantry</h3>
          <div className="flex flex-col gap-4 mt-6">
            {category.map(item => {
              return (
                <PantryItem
                  key={item.id}
                  item={item}
                />
              )
            })}
          </div>
        </section>

        {/*Pantry Overview*/}
        <section className="py-6">
          <a id="pantry" />
          <h3 className="text-2xl">
            Pantry Overview
          </h3>
          <div className="w-1/2 mx-auto">
            <Doughnut data={{
              labels: category.map(item => item.title),
              datasets: [
                {
                  label: "Pantry Items",
                  data: category.map(item => item.total),
                  backgroundColor: category.map(item => item.color),
                  borderColor: ['#18181b'],
                  borderWidth: 5
                }
              ]
            }} />
          </div>
        </section>

      </main>
    </>
  );
}