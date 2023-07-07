import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

describe("Create Car Specification", () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car Test",
      description: "Description Car Test",
      daily_rate: 100,
      license_plate: "TST-123",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "test",
      description: "description test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it("Should not be able to add a new specification to nonexistent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["567"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
