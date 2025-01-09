import { useState } from "react"
import { Button } from "@/components/ui/button"

function RoleSelection({ onSelectRole }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Choose your role</h2>
      <div className="flex space-x-4">
        <Button
          onClick={() => onSelectRole('staff')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Staff
        </Button>
        <Button
          onClick={() => onSelectRole('admin')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Admin
        </Button>
      </div>
    </div>
  )
}

export default RoleSelection

