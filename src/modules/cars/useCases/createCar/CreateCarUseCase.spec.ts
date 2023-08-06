import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create Car", () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "CAS-123",
      fine_amount: 60,
      brand: "Chevolet",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with a exists license plate", async () => {
    const car = {
      name: "Name Car same plate",
      description: "Description Car same plate",
      daily_rate: 100,
      license_plate: "CAS-1234",
      fine_amount: 60,
      brand: "Chevolet",
      category_id: "category",
    };

    await createCarUseCase.execute(car);

    await expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError("Car alreadyExists")
    );
  });

  it("Should be able to create a cars with available true by deafult", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Description Car Available",
      daily_rate: 100,
      license_plate: "AVAL-123",
      fine_amount: 60,
      brand: "Chevolet",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
