import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vestido Floral Primavera",
    price: 89.90,
    category: "Menina",
    image: "https://picsum.photos/id/342/600/800",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Vestido leve e rodado com estampa floral, perfeito para dias de sol.",
    isNew: true,
    isBestSeller: true,
    color: "Rosa",
    ageRange: "4-8 anos"
  },
  {
    id: 2,
    name: "Conjunto Moletom Dino",
    price: 119.90,
    category: "Menino",
    image: "https://picsum.photos/id/103/600/800",
    sizes: ["2", "4", "6", "8"],
    description: "Conjunto de calça e blusão em moletom macio com estampa de dinossauro.",
    isBestSeller: true,
    color: "Verde",
    ageRange: "2-4 anos"
  },
  {
    id: 3,
    name: "Macacão Bebê Ursinho",
    price: 69.90,
    category: "Bebê",
    image: "https://picsum.photos/id/22/600/800",
    sizes: ["P", "M", "G", "GG"],
    description: "Macacão em algodão orgânico, super confortável para a pele sensível do bebê.",
    isNew: true,
    color: "Bege",
    ageRange: "0-24 meses"
  },
  {
    id: 4,
    name: "Jaqueta Jeans Kids",
    price: 149.90,
    category: "Menina",
    image: "https://picsum.photos/id/338/600/800",
    sizes: ["4", "6", "8", "10", "12"],
    description: "Jaqueta jeans clássica com acabamento premium e botões reforçados.",
    color: "Azul",
    ageRange: "8-12 anos"
  },
  {
    id: 5,
    name: "Camiseta Super Herói",
    price: 49.90,
    category: "Menino",
    image: "https://picsum.photos/id/177/600/800",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Camiseta em algodão com estampa divertida. Ideal para brincar.",
    isBestSeller: true,
    color: "Vermelho",
    ageRange: "4-8 anos"
  },
  {
    id: 6,
    name: "Kit Body Básico (3 un)",
    price: 79.90,
    category: "Bebê",
    image: "https://picsum.photos/id/1027/600/800",
    sizes: ["RN", "P", "M", "G"],
    description: "Kit essencial com 3 bodies de cores neutras. Malha suedine.",
    color: "Branco",
    ageRange: "0-24 meses"
  },
  {
    id: 7,
    name: "Saia Tule Encantada",
    price: 59.90,
    category: "Menina",
    image: "https://picsum.photos/id/65/600/800",
    sizes: ["4", "6", "8"],
    description: "Saia de tule rosa com brilhos sutis. A favorita das pequenas princesas.",
    isNew: true,
    color: "Rosa",
    ageRange: "4-8 anos"
  },
  {
    id: 8,
    name: "Bermuda Cargo Aventura",
    price: 64.90,
    category: "Menino",
    image: "https://picsum.photos/id/400/600/800",
    sizes: ["4", "6", "8", "10"],
    description: "Bermuda resistente com vários bolsos, pronta para qualquer aventura.",
    color: "Caqui",
    ageRange: "4-8 anos"
  },
  {
    id: 9,
    name: "Tiara Laço de Fita",
    price: 29.90,
    category: "Acessórios",
    image: "https://picsum.photos/id/106/600/800",
    sizes: ["Único"],
    description: "Tiara confortável com laço grande em fita de gorgurão.",
    color: "Rosa",
    ageRange: "2-4 anos"
  },
  {
    id: 10,
    name: "Boné Estilo Urbano",
    price: 39.90,
    category: "Acessórios",
    image: "https://picsum.photos/id/1012/600/800",
    sizes: ["Único"],
    description: "Boné com ajuste traseiro e proteção solar.",
    isNew: true,
    color: "Preto",
    ageRange: "8-12 anos"
  }
];

export const CATEGORIES = ["Todos", "Menina", "Menino", "Bebê", "Acessórios"];

export const FILTERS = {
  colors: ["Rosa", "Azul", "Verde", "Bege", "Vermelho", "Branco", "Caqui", "Preto"],
  ageRanges: ["0-24 meses", "2-4 anos", "4-8 anos", "8-12 anos"],
  sizes: ["RN", "P", "M", "G", "2", "4", "6", "8", "10", "12"]
};