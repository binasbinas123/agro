"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag, CheckCircle2 } from "lucide-react"

type CartItem = {
  id: number
  nome: string
  preco: number
  quantidade: number
}

interface CartProps {
  carrinho: CartItem[]
  setCarrinho: React.Dispatch<React.SetStateAction<CartItem[]>>
  onVoltar: () => void
  onFinalizarCompra: () => void
}

export function Cart({ carrinho, setCarrinho, onVoltar, onFinalizarCompra }: CartProps) {
  const aumentarQuantidade = (id: number) => {
    setCarrinho((prev) => prev.map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item)))
  }

  const diminuirQuantidade = (id: number) => {
    setCarrinho((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item))
        .filter((item) => item.quantidade > 0),
    )
  }

  const removerItem = (id: number) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0)
  const frete = subtotal > 500 ? 0 : 50
  const desconto = subtotal > 1000 ? subtotal * 0.05 : 0
  const total = subtotal + frete - desconto

  const finalizarCompra = () => {
    onFinalizarCompra()
    alert(
      `Pedido confirmado com sucesso!\n\n` +
        `Subtotal: R$ ${subtotal.toFixed(2)}\n` +
        `Frete: R$ ${frete.toFixed(2)}\n` +
        `Desconto: R$ ${desconto.toFixed(2)}\n` +
        `Total: R$ ${total.toFixed(2)}\n\n` +
        `O estoque foi atualizado automaticamente!\n` +
        `Obrigado por comprar na AgroNexus!`,
    )
    setCarrinho([])
    onVoltar()
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Button
        variant="outline"
        className="mb-6 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-white shadow-md font-medium"
        onClick={onVoltar}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Continuar Comprando
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-emerald-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200">
              <CardTitle className="text-2xl text-emerald-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Carrinho de Compras
                {carrinho.length > 0 && (
                  <span className="text-base font-normal text-emerald-600">
                    ({carrinho.length} {carrinho.length === 1 ? "item" : "itens"})
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {carrinho.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-20 h-20 mx-auto text-emerald-200 mb-4" />
                  <h3 className="text-xl font-semibold text-emerald-900 mb-2">Seu carrinho está vazio</h3>
                  <p className="text-emerald-600 mb-6">Adicione produtos para começar suas compras</p>
                  <Button
                    onClick={onVoltar}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    Ver Produtos
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {carrinho.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-5 bg-white border border-emerald-200 rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-emerald-900 text-lg mb-1">{item.nome}</h3>
                        <p className="text-emerald-700 font-medium">R$ {item.preco.toFixed(2)} / unidade</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 w-9 p-0 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                            onClick={() => diminuirQuantidade(item.id)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-14 text-center font-bold text-emerald-900 text-lg">{item.quantidade}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 w-9 p-0 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                            onClick={() => aumentarQuantidade(item.id)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <span className="font-bold text-emerald-800 min-w-[110px] text-right text-lg">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </span>

                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => removerItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {carrinho.length > 0 && (
          <div className="lg:col-span-1">
            <Card className="border-emerald-200 shadow-xl sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200">
                <CardTitle className="text-xl text-emerald-900">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-emerald-900">
                    <span>Subtotal</span>
                    <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-900">
                    <span>Frete</span>
                    <span className="font-semibold">
                      {frete === 0 ? <span className="text-green-600">Grátis</span> : `R$ ${frete.toFixed(2)}`}
                    </span>
                  </div>
                  {desconto > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto (5%)</span>
                      <span className="font-semibold">- R$ {desconto.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-emerald-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-emerald-900">Total</span>
                      <span className="text-2xl font-bold text-emerald-800">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-4 space-y-2 border border-emerald-200">
                  {subtotal < 500 && (
                    <p className="text-sm text-emerald-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Frete grátis em compras acima de R$ 500</span>
                    </p>
                  )}
                  {subtotal >= 500 && (
                    <p className="text-sm text-green-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Você ganhou frete grátis!</span>
                    </p>
                  )}
                  {subtotal < 1000 && (
                    <p className="text-sm text-emerald-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>5% de desconto em compras acima de R$ 1.000</span>
                    </p>
                  )}
                  {desconto > 0 && (
                    <p className="text-sm text-green-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Você ganhou 5% de desconto!</span>
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-200">
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-base py-6 font-semibold shadow-lg"
                  onClick={finalizarCompra}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Finalizar Pedido
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
