"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Package, DollarSign } from "lucide-react"

type Produto = {
  id: number
  nome: string
  preco: number
  categoria: string
  descricao: string
  estoque: number
  vendas: number
  imagem: string
  unidade: string
}

interface SalesChartProps {
  produtos: Produto[]
  onVoltar: () => void
}

export function SalesChart({ produtos, onVoltar }: SalesChartProps) {
  const produtosOrdenados = [...produtos].sort((a, b) => b.vendas - a.vendas)
  const maxVendas = Math.max(...produtos.map((p) => p.vendas))
  const totalVendas = produtos.reduce((sum, p) => p.vendas, 0)
  const receitaTotal = produtos.reduce((sum, p) => p.vendas * p.preco, 0)
  const estoqueTotal = produtos.reduce((sum, p) => p.estoque, 0)

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        variant="outline"
        className="mb-6 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-white shadow-md font-medium"
        onClick={onVoltar}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar ao Catálogo
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-emerald-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-900">{totalVendas}</p>
            <p className="text-sm text-emerald-600 mt-1">Unidades vendidas</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Receita Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-900">R$ {receitaTotal.toFixed(2)}</p>
            <p className="text-sm text-emerald-600 mt-1">Faturamento acumulado</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Estoque Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-900">{estoqueTotal}</p>
            <p className="text-sm text-emerald-600 mt-1">Unidades disponíveis</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-emerald-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200">
          <CardTitle className="text-2xl text-emerald-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Gráfico de Produtos Mais Vendidos
          </CardTitle>
          <p className="text-sm text-emerald-700 mt-2">Análise de performance de vendas em padrão dente de serra</p>
        </CardHeader>
        <CardContent className="pt-8 pb-8">
          <div className="space-y-6">
            {produtosOrdenados.map((produto, index) => {
              const percentual = (produto.vendas / maxVendas) * 100
              const pontos = []
              const largura = percentual
              const segmentos = 8

              for (let i = 0; i <= segmentos; i++) {
                const x = (i / segmentos) * largura
                const y = i % 2 === 0 ? 0 : 100
                pontos.push(`${x}% ${y}%`)
              }

              const clipPath = `polygon(${pontos.join(", ")})`

              return (
                <div key={produto.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-2xl font-bold text-emerald-600 w-8 text-center">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-emerald-900 text-sm truncate">{produto.nome}</h3>
                        <p className="text-xs text-emerald-600">{produto.categoria}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xl font-bold text-emerald-800">{produto.vendas}</p>
                      <p className="text-xs text-emerald-600">vendas</p>
                    </div>
                  </div>

                  <div className="relative h-10 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"
                      style={{
                        width: `${percentual}%`,
                        clipPath: clipPath,
                      }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-end pr-3 font-semibold text-sm"
                      style={{ width: `${percentual}%` }}
                    >
                      <span className="text-white drop-shadow-md">
                        R$ {(produto.vendas * produto.preco).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 bg-emerald-50 rounded-lg p-6 border border-emerald-200">
            <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Insights de Vendas
            </h4>
            <div className="space-y-2 text-sm text-emerald-800">
              <p>
                <strong>Produto mais vendido:</strong> {produtosOrdenados[0]?.nome} ({produtosOrdenados[0]?.vendas}{" "}
                unidades)
              </p>
              <p>
                <strong>Maior receita:</strong>{" "}
                {
                  produtosOrdenados.reduce((max, p) => {
                    const receita = p.vendas * p.preco
                    const maxReceita = max.vendas * max.preco
                    return receita > maxReceita ? p : max
                  }).nome
                }
              </p>
              <p>
                <strong>Ticket médio:</strong> R$ {(receitaTotal / totalVendas).toFixed(2)} por unidade vendida
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
