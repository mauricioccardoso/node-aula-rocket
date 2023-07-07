import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list All available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test All",
      description: "Description Car Test All",
      daily_rate: 150,
      license_plate: "TST-1234",
      fine_amount: 50,
      brand: "brand",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });

  it("Should be able to list All available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test category_id",
      description: "Description Car Test category_id",
      daily_rate: 150,
      license_plate: "TST-1234",
      fine_amount: 50,
      brand: "brand",
      category_id: "category_id_test",
    });

    const cars = await listCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list All available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test name",
      description: "Description Car Test name",
      daily_rate: 150,
      license_plate: "TST-1234",
      fine_amount: 50,
      brand: "brand",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({
      name: car.name,
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list All available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test brand",
      description: "Description Car Test brand",
      daily_rate: 150,
      license_plate: "TST-1234",
      fine_amount: 50,
      brand: "brand_test",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({
      brand: car.brand,
    });

    expect(cars).toEqual([car]);
  });
});
