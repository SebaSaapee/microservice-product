import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { ProductDTO } from '../dto/product.dto';
import { IProduct } from '../../common/interface/product.interface';
import { ProductModule } from '../product.module';
import { getModelToken } from '@nestjs/mongoose';
import { PRODUCT } from '../../common/models/models';
import { Product } from '../product.model';


describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule], // Import your ProductModule here
    })
      .overrideProvider(getModelToken(PRODUCT.name)) // Replace PRODUCT with your actual model name
      .useValue(jest.fn()) // Use a mock value or a mock implementation
      .compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of type Product', async () => {
      // Mock data for products
      const mockProducts: Product[] = [
        { nombre: 'Product 1', descripcion: 'Description 1', precio: '10.99', image: 'image1.jpg' },
        { nombre: 'Product 2', descripcion: 'Description 2', precio: '20.99', image: 'image2.jpg' },
      ];
    
      // Mock the 'findAll' method of productService to resolve with the mockProducts array
      jest.spyOn(productService, 'findAll').mockResolvedValue(mockProducts as IProduct[]);

      // Call the 'findAll' method of the controller
      const result = await controller.findAll();
    
      // Expect that the result is an array with the same length as the mockProducts
      expect(result).toHaveLength(mockProducts.length);
    });
  });

  describe('findAll', () => {
    it('should return an array of type Product with the expected data', async () => {
      // Mock data for products
      const mockProducts: Product[] = [
        { nombre: 'Product 1', descripcion: 'Description 1', precio: '10.99', image: 'image1.jpg' },
        { nombre: 'Product 2', descripcion: 'Description 2', precio: '20.99', image: 'image2.jpg' },
      ];
    
      // Mock the 'findAll' method of productService to resolve with the mockProducts array
      jest.spyOn(productService, 'findAll').mockResolvedValue(mockProducts as IProduct[]);
    
      // Call the 'findAll' method of the controller
      const result = await controller.findAll();
    
      // Expect that the result is equal to the mockProducts array
      expect(result).toEqual(mockProducts);
    });
  });
  
  describe('findAll', () => {
  it('should call the productService findAll method once', async () => {
    // Mock data for products
    const mockProducts: Product[] = [
      { nombre: 'Product 1', descripcion: 'Description 1', precio: '10.99', image: 'image1.jpg' },
      { nombre: 'Product 2', descripcion: 'Description 2', precio: '20.99', image: 'image2.jpg' },
    ];
  
    // Mock the 'findAll' method of productService to resolve with the mockProducts array
    jest.spyOn(productService, 'findAll').mockResolvedValue(mockProducts as IProduct[]);
  
    // Call the 'findAll' method of the controller
    await controller.findAll();
  
    // Expect that the 'findAll' method of productService is called once
    expect(productService.findAll).toHaveBeenCalledTimes(1);
    
    });
  });

  describe('update', () => {
    it('should call the productService update method once', async () => {
        // Mock data for product update
        const productDTO: ProductDTO = {
          nombre: 'Updated Product 1',
          descripcion: 'Updated Description of Product 1',
          precio: '15.99',
          image: 'updated_image.jpg',
        };
    
        // Mock the 'update' method of productService to resolve with the updated product
        const updatedProduct: Product = {
          ...productDTO,
        };
    
        jest.spyOn(productService, 'update').mockResolvedValue(updatedProduct as IProduct);
    
        // Call the 'update' method of the controller
        const result = await controller.update(productDTO);
    
        // Expect that the result is equal to the updated product
        expect(result).toEqual(updatedProduct);
    
        // Expect that the 'update' method of productService is called once with the provided productDTO
        expect(productService.update).toHaveBeenCalledTimes(1);
        
      });
  });
    // ... Other tests ...
});
