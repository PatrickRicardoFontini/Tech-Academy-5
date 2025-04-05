import { Request, Response } from "express";
import CarModel from "../models/CarModel";

// Busca todos os carros
export const getAllCars = async (req: Request, res: Response) => {
  const cars = await CarModel.findAll();
  res.send(cars);
};

// Busca um carro por ID
export const getCarById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const car = await CarModel.findByPk(req.params.id);
  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }
  res.json(car);
};

// Cria um novo carro
export const createCar = async (req: Request, res: Response) => {
  try {
    const { model, description, specs, averagePrice, type, year, brandId } =
      req.body;

    if (
      !model ||
      !description ||
      !specs ||
      !averagePrice ||
      !type ||
      !year ||
      !brandId
    ) {
      return res.status(400).json({ error: "Values required" });
    }

    const car = await CarModel.create({
      model,
      description,
      specs,
      averagePrice,
      type,
      year,
      brandId,
    });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

// Atualiza um carro
export const updateCar = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const car = await CarModel.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    const { model, description, specs, averagePrice, type, year, brandId } =
      req.body;

    car.model = model || car.model;
    car.description = description || car.description;
    car.specs = specs || car.specs;
    car.averagePrice = averagePrice || car.averagePrice;
    car.type = type || car.type;
    car.year = year || car.year;
    car.brandId = brandId || car.brandId;

    await car.save();
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

// Deleta um carro
export const deleteCar = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const car = await CarModel.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    await car.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};
