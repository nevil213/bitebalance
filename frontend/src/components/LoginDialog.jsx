import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RoleSelection from "./RoleSelection"

function LoginDialog({ isOpen, onClose }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState(null)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setSelectedRole(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login submitted", { email, password })
    // Here you would typically handle the Login logic
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            {selectedRole ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login` : 'Login'}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {selectedRole
              ? `Enter your credentials to log in as ${selectedRole}.`
              : 'Choose your role to proceed with login.'}
          </DialogDescription>
        </DialogHeader>
        {!selectedRole ? (
          <RoleSelection onSelectRole={handleRoleSelect} />
        ) : (<form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter className="block items-center gap-2">
            <div className="flex justify-between w-full">
              <Button type="submit" className="w-1/2 mr-2">Login</Button>
              <Button
                onClick={() => setSelectedRole(null)}
                className="w-1/2 ml-2 text-sm text-white transition-colors duration-300"
              >
                Change role
              </Button>
            </div>
            <div className="mt-3 text-center w-full">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <span 
                  onClick={onClose} 
                  className="text-black hover:underline cursor-pointer"
                >
                  Register Here
                </span>
              </p>
            </div>
          </DialogFooter>
        </form>)}
      </DialogContent>
    </Dialog>
    
  )
}

export default LoginDialog

