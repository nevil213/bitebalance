import { useEffect, useState } from "react"
import { Plus } from 'lucide-react'
import DashboardCard from "../components/DashboardCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function StaffDashboard() {
  const [menu, setMenu] = useState([])
  const [selectedDish, setSelectedDish] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    try {
      const response = await fetch('http://localhost:5000/task/menu')
      const data = await response.json()
      setMenu(data)
    } catch (error) {
      console.error('Error fetching menu:', error)
    }
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/task/orderplaced', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          dish: selectedDish,
          quantity,
        }),
      })

      if (response.ok) {
        // Reset form
        setSelectedDish("")
        setQuantity(1)
        setOrderId("")
        alert('Order placed successfully!')
      } else {
        const error = await response.json()
        alert(error.message)
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Error placing order')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard title="Menu">
          <div className="grid gap-4">
            {menu.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <span>{item.name}</span>
                <span className="font-medium">${item.price}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Place Order">
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dish">Select Dish</Label>
              <Select value={selectedDish} onValueChange={setSelectedDish}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a dish" />
                </SelectTrigger>
                <SelectContent>
                  {menu.map((item) => (
                    <SelectItem key={item._id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Place Order
            </Button>
          </form>
        </DashboardCard>
      </div>
    </div>
  )
}

export default StaffDashboard

