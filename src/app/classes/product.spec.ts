import { Product } from './product';

describe('Products', () => {
  it('should create an instance', () => {
    expect(new Product(1, 'Laptop', 25000, 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/80/582844/1.jpg?1150', 'https://www.jumia.co.ke/asus-tuf-gaming-f15-15.6-fhd-screencore-i510th-gen8gb-ram1tb-hddwindows-10.-44828508.html', 20000, new Date(2021, 10, 4)))
  });
});
