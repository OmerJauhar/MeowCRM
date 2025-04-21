"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle authentication here
    router.push("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#6366f1]">
            <span className="text-xl font-bold text-white">😺</span>
          </div>
          <h1 className="text-2xl font-bold text-[#f8fafc]">Meow CRM</h1>
          <p className="text-[#94a3b8]">Sign in to your account to continue</p>
        </div>

        <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#f8fafc]">Welcome Back</CardTitle>
            <CardDescription className="text-[#94a3b8]">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#f8fafc]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#f8fafc]">Password</Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-[#6366f1] hover:text-[#6366f1]/90"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-[#334155] data-[state=checked]:bg-[#6366f1] data-[state=checked]:border-[#6366f1]"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-[#94a3b8] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#334155]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#1e293b] px-2 text-[#94a3b8]">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
                Google
              </Button>
              <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
                GitHub
              </Button>
            </div>
            <div className="text-center text-sm text-[#94a3b8]">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#6366f1] hover:text-[#6366f1]/90">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
