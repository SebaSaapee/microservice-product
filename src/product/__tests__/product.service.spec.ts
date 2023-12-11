import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { ProductService } from '../product.service';
import { getModelToken } from '@nestjs/mongoose';
import { IProduct } from 'src/common/interface/product.interface';
import { ProductDTO } from '../dto/product.dto';
import { PRODUCT } from '../../common/models/models';
import { Product } from '../product.model';


// Mock del modelo Mongoose
const mockModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  mockConstructor: jest.fn().mockImplementation(function (dto) {
    return {
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    };
  }),
};

// Descripción del conjunto de pruebas para ProductService
describe('ProductService', () => {
  // Instancia del servicio a probar
  let service: ProductService;

  // Configuración antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(PRODUCT.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  // Limpiar mocks después de cada prueba
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Prueba: ProductService debe estar definido
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Prueba: create debe crear un producto
  describe('create', () => {
    it('should create a product', async () => {
      const productDTO: ProductDTO = {
        nombre: 'Product 1',
        descripcion: 'Description 1',
        precio: '10.99',
        image: 'image1.jpg',
      };

      const createdProduct: Partial<IProduct> = { ...productDTO };

      mockModel.mockConstructor.mockReturnValueOnce({
        ...productDTO,
        save: jest.fn().mockResolvedValue(createdProduct),
      });

      const result = await service.create(productDTO);

      // Verifica que se haya llamado al método con el productDTO
      expect(mockModel.mockConstructor).toHaveBeenCalledWith(productDTO);

      // Verifica que se haya llamado al método 'save' del modelo
      expect(result).toEqual(createdProduct);
    });
  });

  // Prueba: findAll debe encontrar todos los productos
  describe('findAll', () => {
    it('should find all products', async () => {
      const productsDTO: ProductDTO[] = [
        {
          nombre: 'Product 1',
          descripcion: 'Description 1',
          precio: '10.99',
          image: 'image1.jpg',
        },
        {
          nombre: 'Product 2',
          descripcion: 'Description 2',
          precio: '20.99',
          image: 'image2.jpg',
        },
      ];

      const products: Partial<IProduct>[] = productsDTO.map((productDTO) => ({ ...productDTO }));

      mockModel.find.mockResolvedValue(products);

      const result = await service.findAll();
      expect(result).toEqual(products);
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  // Prueba: findOne debe encontrar un producto por ID
  describe('findOne', () => {
    it('should find a product by ID', async () => {
      const productId = 'some-product-id';
      const productDTO: ProductDTO = {
        nombre: 'Product 1',
        descripcion: 'Description 1',
        precio: '10.99',
        image: 'image1.jpg',
      };

      const product: Partial<IProduct> = { ...productDTO };

      mockModel.findById.mockResolvedValue(product);

      const result = await service.findOne(productId);
      expect(result).toEqual(product);
      expect(mockModel.findById).toHaveBeenCalledWith(productId);
    });
  });

  // Prueba: update debe actualizar un producto
  describe('update', () => {
    it('should update a product', async () => {
      const productId = 'some-product-id';
      const productDTO: ProductDTO = {
        nombre: 'Updated Product 1',
        descripcion: 'Updated Description of Product 1',
        precio: '15.99',
        image: 'updated_image.jpg',
      };

      const updatedProduct: Partial<IProduct> = { ...productDTO };

      mockModel.findByIdAndUpdate.mockResolvedValue(updatedProduct);

      const result = await service.update(productId, productDTO);

      // Verifica que se haya llamado al método con el productId y un objeto para el update
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        productId,
        expect.objectContaining({
          nombre: productDTO.nombre,
          descripcion: productDTO.descripcion,
          precio: productDTO.precio,
          image: productDTO.image,
        }),
        { new: true }
      );
      expect(result).toEqual(updatedProduct);
    });
  });

  // Prueba: delete debe eliminar un producto
  describe('delete', () => {
    it('should delete a product', async () => {
      const productId = 'some-product-id';

      const result = await service.delete(productId);
      expect(result).toEqual({
        status: HttpStatus.OK,
        msg: 'deleted',
      });
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(productId);
    });
  });
});
