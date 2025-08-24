import { NextResponse, NextRequest } from 'next/server';
import { products } from '@/data/products'; 



export async function GET() {
  return NextResponse.json(products);
}


export async function POST(request: NextRequest) {
  try {
    const newProductData = await request.json();

    
    if (!newProductData.name || !newProductData.price || !newProductData.description) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = {
      id: `${Date.now()}`,
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
    };
    
    
    products.push(newProduct);

    return NextResponse.json({ message: 'Product added successfully', product: newProduct }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}