import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dateProvider: IDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeAll(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "Test",
      description: "Test Description",
      brand: "Test Brand",
      daily_rate: 102,
      license_plate: "test-123",
      fine_amount: 30,
      category_id: "123",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = await carsRepository.create({
      name: "Test same user 1234",
      description: "Test Description same user 2",
      daily_rate: 1022,
      license_plate: "tsts-452",
      fine_amount: 32,
      brand: "Test Brand same user 2",
      category_id: "34",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123456",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "asdasd",
        user_id: "123456",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User already has a rental in progress"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await carsRepository.create({
      name: "Test same car",
      description: "Test Description same car",
      brand: "Test Brand same car",
      daily_rate: 102,
      license_plate: "test-12345",
      fine_amount: 30,
      category_id: "1234",
    });

    await createRentalUseCase.execute({
      user_id: "9876",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "9876",
        car_id: "4321",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
