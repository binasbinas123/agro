"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"
import { ProductCatalog } from "@/components/product-catalog"

type User = {
  username: string
  password: string
  email: string
}

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [users, setUsers] = useState<User[]>([
    { username: "binas", password: "binas123", email: "binas@agronexus.com" },
  ])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("Credenciais inválidas. Verifique usuário e senha.")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (users.find((u) => u.username === username)) {
      setError("Este usuário já existe. Escolha outro nome de usuário.")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.")
      return
    }

    setUsers([...users, { username, password, email }])
    setError("")
    setShowRegister(false)
    alert("Conta criada com sucesso! Faça login para continuar.")
    setUsername("")
    setPassword("")
    setEmail("")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-emerald-800 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-xl">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <div>
              <CardTitle className="text-4xl font-bold text-white text-balance tracking-tight">AgroNexus</CardTitle>
              <CardDescription className="text-emerald-300 mt-3 text-base">
                {showRegister ? "Criar Nova Conta" : "Plataforma Empresarial de Gestão Agrícola"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-8">
            {!showRegister && (
              <div className="mb-6 bg-emerald-950/50 border border-emerald-700 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-emerald-200 text-sm font-semibold mb-2">Credenciais de Acesso:</p>
                <div className="space-y-1">
                  <p className="text-emerald-100 text-sm">
                    <span className="font-medium">Usuário:</span> binas
                  </p>
                  <p className="text-emerald-100 text-sm">
                    <span className="font-medium">Senha:</span> binas123
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={showRegister ? handleRegister : handleLogin} className="space-y-5">
              {showRegister && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-emerald-100 font-medium">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-emerald-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-emerald-500 h-11"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-emerald-100 font-medium">
                  Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-emerald-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-emerald-500 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-emerald-100 font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-emerald-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-emerald-500 h-11"
                />
                {showRegister && <p className="text-xs text-emerald-300">Mínimo de 6 caracteres</p>}
              </div>
              {error && (
                <div className="bg-red-950/50 border border-red-800 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm text-red-300 font-medium">{error}</p>
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white h-12 font-semibold shadow-lg"
              >
                {showRegister ? "Criar Conta" : "Acessar Plataforma"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowRegister(!showRegister)
                    setError("")
                    setUsername("")
                    setPassword("")
                    setEmail("")
                  }}
                  className="text-emerald-300 hover:text-emerald-200 text-sm font-medium transition-colors"
                >
                  {showRegister ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <ProductCatalog onLogout={() => setIsLoggedIn(false)} />
}
