import { Test, TestingModule } from '@nestjs/testing';
import { ProductDTO } from './../dto/product.dto';
import { validate } from 'class-validator';

describe('ProductDTO', () => {
  let createProductDto: () => ProductDTO;

  beforeEach(() => {
    createProductDto = () => ({
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto',
      precio: '10.99',
      image: 'imagen.jpg',
    });
  });

  it('should be defined', () => {
    const productDto = createProductDto();
    expect(productDto).toBeDefined();
  });

  it('should have a valid nombre', async () => {
    const productDto = createProductDto();
    const errors = await validate(productDto);
    expect(errors.find(error => error.property === 'nombre')).toBeUndefined();
  });

  it('should have a valid descripcion', async () => {
    const productDto = createProductDto();
    const errors = await validate(productDto);
    expect(errors.find(error => error.property === 'descripcion')).toBeUndefined();
  });

  it('should have a valid precio', async () => {
    const productDto = createProductDto();
    const errors = await validate(productDto);
    expect(errors.find(error => error.property === 'precio')).toBeUndefined();
  });

  it('should have a valid image', async () => {
    const productDto = createProductDto();
    const errors = await validate(productDto);
    expect(errors.find(error => error.property === 'image')).toBeUndefined();
  });
});

