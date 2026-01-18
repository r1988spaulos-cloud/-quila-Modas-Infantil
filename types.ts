export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Menina' | 'Menino' | 'Bebê' | 'Acessórios';
  image: string;
  sizes: string[];
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  color: string;
  ageRange: '0-24 meses' | '2-4 anos' | '4-8 anos' | '8-12 anos';
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  cpf: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: 'credit_card' | 'boleto';
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}