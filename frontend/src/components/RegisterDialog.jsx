import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoginDialog from "./LoginDialog"

function RegisterDialog() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Register submitted", { name, email, password })
    // Here you would typically handle the Register logic
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span id="reg" style={{ display: "none" }}>Register here</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[36rem]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Enter your details to create an account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Enterprise Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
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
            <Button type="submit" className="w-full">Register</Button>
            <div className="mt-3 text-center">
              <p className="text-gray-600">
                Already registered?{" "}
                <span 
                  onClick={() => {
                    setIsOpen(false)
                    setIsLoginOpen(true)
                  }} 
                  className="text-black hover:underline cursor-pointer"
                >
                  Login Here
                </span>
              </p>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
      {isLoginOpen && (
        <LoginDialog 
          isOpen={isLoginOpen} 
          onClose={() => {
            setIsLoginOpen(false)
            setIsOpen(true)
          }}
        />
      )}
    </Dialog>
  )
}

export default RegisterDialog

