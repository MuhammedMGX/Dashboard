"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import Waves from "@/blocks/Backgrounds/Waves/Waves";

export type dataLogin = {
    username: string
    password: string
  }

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()




  
function createToken(username: string) {
  return btoa(JSON.stringify({ username, date: Date.now() }))
}

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const token = createToken(username)
  document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`
  window.location.href = "/dashboard"; 
}


  return (
    <>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">

            <Waves
              lineColor="#fff"
              backgroundColor="rgba(99, 99, 99, 0.2)"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={40}
              waveAmpY={20}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={12}
              yGap={36}
            />

    <div className="w-full max-w-sm z-10">



    <div className="flex flex-col gap-6">
      <Card >
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johnd"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" >
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>

    </div>
    </div>

    </>
  )
}
