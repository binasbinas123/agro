"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LogOut, ShoppingCart, Search, Filter, Package, Leaf, TrendingUp, BarChart3 } from "lucide-react"
import { Cart } from "@/components/cart"
import { SalesChart } from "@/components/sales-chart"

const PRODUTOS_INICIAIS = [
  {
    id: 1,
    nome: "Semente de Milho Híbrido Premium",
    preco: 125.0,
    categoria: "Sementes",
    descricao: "Híbrido de alta performance com resistência a pragas e ciclo de 120 dias",
    estoque: 50,
    vendas: 45,
    imagem: "/corn-seeds-bag.jpg",
    unidade: "Saco 10kg",
  },
  {
    id: 2,
    nome: "Fertilizante NPK 10-10-10",
    preco: 180.0,
    categoria: "Fertilizantes",
    descricao: "Formulação balanceada para todas as fases de crescimento das culturas",
    estoque: 30,
    vendas: 38,
    imagem: "/fertilizer-bag.png",
    unidade: "Saco 50kg",
  },
  {
    id: 3,
    nome: "Defensivo Agrícola Sistêmico",
    preco: 95.0,
    categoria: "Defensivos",
    descricao: "Proteção completa contra pragas e doenças foliares",
    estoque: 40,
    vendas: 52,
    imagem: "/agricultural-pesticide.jpg",
    unidade: "Litro",
  },
  {
    id: 4,
    nome: "Semente de Soja Transgênica RR",
    preco: 280.0,
    categoria: "Sementes",
    descricao: "Tecnologia Roundup Ready com alta produtividade e resistência",
    estoque: 25,
    vendas: 31,
    imagem: "/soybean-seeds.jpg",
    unidade: "Saco 20kg",
  },
  {
    id: 5,
    nome: "Adubo Orgânico Compostado",
    preco: 65.0,
    categoria: "Fertilizantes",
    descricao: "100% orgânico, rico em matéria orgânica e nutrientes essenciais",
    estoque: 60,
    vendas: 28,
    imagem: "/organic-fertilizer-mix.png",
    unidade: "Saco 30kg",
  },
  {
    id: 6,
    nome: "Sistema de Irrigação Inteligente",
    preco: 350.0,
    categoria: "Equipamentos",
    descricao: "Controlador automático com sensores de umidade e programação",
    estoque: 15,
    vendas: 19,
    imagem: "/agricultural-irrigation.png",
    unidade: "Kit completo",
  },
]

type CartItem = {
  id: number
  nome: string
  preco: number
  quantidade: number
}

type Produto = (typeof PRODUTOS_INICIAIS)[0]

interface ProductCatalogProps {
  onLogout: () => void
}

export function ProductCatalog({ onLogout }: ProductCatalogProps) {
  const [produtos, setProdutos] = useState<Produto[]>(PRODUTOS_INICIAIS)
  const [carrinho, setCarrinho] = useState<CartItem[]>([])
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false)
  const [mostrarGrafico, setMostrarGrafico] = useState(false)
  const [busca, setBusca] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("Todas")

  const adicionarAoCarrinho = (produto: Produto) => {
    const itemNoCarrinho = carrinho.find((item) => item.id === produto.id)
    const quantidadeNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0

    if (produto.estoque <= quantidadeNoCarrinho) {
      alert(`Estoque insuficiente! Apenas ${produto.estoque} unidades disponíveis.`)
      return
    }

    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.id === produto.id)

      if (itemExistente) {
        return prev.map((item) => (item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item))
      }

      return [...prev, { id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: 1 }]
    })
  }

  const finalizarCompra = () => {
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) => {
        const itemCarrinho = carrinho.find((item) => item.id === produto.id)
        if (itemCarrinho) {
          return {
            ...produto,
            estoque: produto.estoque - itemCarrinho.quantidade,
            vendas: produto.vendas + itemCarrinho.quantidade,
          }
        }
        return produto
      }),
    )
  }

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0)

  const produtosFiltrados = produtos.filter((produto) => {
    const matchBusca =
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchCategoria = categoriaFiltro === "Todas" || produto.categoria === categoriaFiltro
    return matchBusca && matchCategoria
  })

  const categorias = ["Todas", ...Array.from(new Set(produtos.map((p) => p.categoria)))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50">
      <header className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 text-white shadow-2xl sticky top-0 z-20 border-b border-emerald-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AgroNexus</h1>
              <p className="text-xs text-emerald-300">Sistema de Gestão e Vendas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="relative bg-white/10 text-white hover:bg-white/20 border-white/30 font-medium shadow-lg backdrop-blur-sm"
              onClick={() => {
                setMostrarGrafico(!mostrarGrafico)
                setMostrarCarrinho(false)
              }}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Relatórios
            </Button>

            <Button
              variant="outline"
              className="relative bg-white/10 text-white hover:bg-white/20 border-white/30 font-medium shadow-lg backdrop-blur-sm"
              onClick={() => {
                setMostrarCarrinho(!mostrarCarrinho)
                setMostrarGrafico(false)
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Carrinho
              {totalItens > 0 && <Badge className="ml-2 bg-red-500 text-white border-0 shadow-md">{totalItens}</Badge>}
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 border border-white/20 font-medium backdrop-blur-sm"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {mostrarGrafico ? (
          <SalesChart produtos={produtos} onVoltar={() => setMostrarGrafico(false)} />
        ) : mostrarCarrinho ? (
          <Cart
            carrinho={carrinho}
            setCarrinho={setCarrinho}
            onVoltar={() => setMostrarCarrinho(false)}
            onFinalizarCompra={finalizarCompra}
          />
        ) : (
          <>
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-3 text-balance">Catálogo de Insumos Agrícolas</h2>
              <p className="text-slate-700 text-lg max-w-2xl mx-auto text-pretty">
                Produtos premium com qualidade certificada e entrega garantida em todo território nacional
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                  <Input
                    placeholder="Pesquisar produtos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10 h-12 border-slate-300 focus:border-emerald-600"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="w-5 h-5 text-slate-700" />
                  <div className="flex gap-2 flex-wrap">
                    {categorias.map((cat) => (
                      <Button
                        key={cat}
                        variant={categoriaFiltro === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategoriaFiltro(cat)}
                        className={
                          categoriaFiltro === cat
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {produtosFiltrados.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-slate-600">Tente ajustar os filtros ou a pesquisa</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {produtosFiltrados.map((produto) => (
                  <Card
                    key={produto.id}
                    className="hover:shadow-2xl transition-all duration-300 border-slate-200 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={produto.imagem || "/placeholder.svg"}
                        alt={produto.nome}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-emerald-600 text-white border-0 shadow-lg">
                        {produto.categoria}
                      </Badge>
                      <Badge className="absolute top-3 left-3 bg-blue-600 text-white border-0 shadow-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {produto.vendas} vendidos
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-emerald-900 leading-snug text-balance">
                        {produto.nome}
                      </CardTitle>
                      <CardDescription className="text-emerald-700 text-sm leading-relaxed">
                        {produto.descricao}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className="text-3xl font-bold text-emerald-800">R$ {produto.preco.toFixed(2)}</span>
                          <span className="text-sm text-emerald-600 font-medium">/{produto.unidade}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-emerald-600">
                            <strong>Estoque:</strong> {produto.estoque} unidades
                          </span>
                          {produto.estoque < 20 && produto.estoque > 0 && (
                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                              Baixo estoque
                            </Badge>
                          )}
                          {produto.estoque === 0 && (
                            <Badge variant="outline" className="text-red-600 border-red-300">
                              Esgotado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => adicionarAoCarrinho(produto)}
                        disabled={produto.estoque === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {produto.estoque === 0 ? "Produto Esgotado" : "Adicionar ao Carrinho"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white mt-20 py-12 border-t border-emerald-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                AgroNexus
              </h3>
              <p className="text-emerald-200 leading-relaxed">
                Referência nacional em fornecimento de insumos agrícolas de alta qualidade para o agronegócio
                profissional.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-emerald-300">Nossas Categorias</h4>
              <ul className="space-y-2 text-emerald-100">
                <li>Sementes Certificadas</li>
                <li>Fertilizantes Especializados</li>
                <li>Defensivos Agrícolas</li>
                <li>Equipamentos Tecnológicos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-emerald-300">Diferenciais</h4>
              <ul className="space-y-2 text-emerald-100">
                <li>Cobertura nacional completa</li>
                <li>Consultoria técnica especializada</li>
                <li>Certificação de qualidade</li>
                <li>Preços competitivos do mercado</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-900 pt-6 text-center">
            <p className="text-emerald-100">2025 AgroNexus - Todos os direitos reservados</p>
            <p className="text-sm text-emerald-300 mt-2">CNPJ: 12.345.678/0001-90 | Registro MAPA: BR-0001234</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
