import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/Entities/Order.Entity';
import { Between, Repository } from 'typeorm';
import { CreateOrderDto } from './DTO/Order.dto';
import { UpdateOrderParams } from './Utils/types';
import { Response } from 'express';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private OrderRepository: Repository<Orders>,
  ) {}

  // Method to create an order with automatically generated OrderNumber
  async createOrders(createOrderDto: CreateOrderDto): Promise<Orders> {
    // Generate a unique OrderNumber
    const orderNumber = await this.generateUniqueOrderNumber();
    createOrderDto.OrderNumber = orderNumber; // Assign the generated OrderNumber to the DTO

    const newOrder = this.OrderRepository.create(createOrderDto);
    return await this.OrderRepository.save(newOrder);
  }

  // Private method to generate a unique OrderNumber
  private async generateUniqueOrderNumber(): Promise<string> {
    let isUnique = false;
    let orderNumber: string;

    while (!isUnique) {
      // Generate a random 5-digit number
      const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a number between 10000 and 99999
      orderNumber = `BIB${randomNumber}`;

      // Check if this OrderNumber already exists
      const existingOrder = await this.OrderRepository.findOne({
        where: { OrderNumber: orderNumber },
      });

      if (!existingOrder) {
        isUnique = true; // If no existing order found, the OrderNumber is unique
      }
    }

    return orderNumber;
  }

  // Method to find an order by OrderNumber
  async findOrderByOrderNumber(orderNumber: string): Promise<Orders | string> {
    try {
      const order = await this.OrderRepository.findOne({
        where: { OrderNumber: orderNumber },
      });

      if (!order) {
        return `Order with number ${orderNumber} not found`;
      }

      return order;
    } catch (error) {
      console.error(
        `Error while searching for an order by OrderNumber: ${error.message}`,
      );
      throw new Error(`Error while searching for order: ${error.message}`);
    }
  }

  // Method to find transactions by selected date
  async findOrdersTransactionBySelectedDate(selectedDate: string) {
    try {
      const Ordertransactions = await this.OrderRepository.createQueryBuilder(
        'Orders',
      )
        .where('OrderDate(Orders.OrderDate) = :selectedDate', { selectedDate })
        .getMany();

      return Ordertransactions;
    } catch (error) {
      console.error(
        'An error occurred when selecting the chosen date',
        error,
      );
      throw new Error(
        'Could not retrieve order transactions for the selected date.',
      );
    }
  }

  // Other methods in the service...

  async GetAllOrders(): Promise<Orders[]> {
    return await this.OrderRepository.find();
  }

  async findOrdersByName(name: string): Promise<Orders[] | string> {
    const queryBuilder = this.OrderRepository.createQueryBuilder('order');

    try {
      const results = await queryBuilder
        .where('LOWER(CONCAT(order.CustomerName)) LIKE LOWER(:FullName)', {
          FullName: `%${name}%`,
        })
        .getMany();

      if (results.length === 0) {
        return 'Order not found';
      }

      return results;
    } catch (error) {
      console.error(
        `Error while searching for an order by name: ${error.message}`,
      );
      throw new Error(`Error while searching an order by name: ${error.message}`);
    }
  }

  async findTotalAmountOfCurrentDay(): Promise<number> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
  
    try {
      const result = await this.OrderRepository
        .createQueryBuilder('Orders') 
        .select('SUM(Orders."Price")', 'total') 
        .where('Orders."OrderDate" BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay }) 
        .getRawOne();
  
      return result.total || 0; // Return 0 if there is no result
    } catch (error) {
      console.error(`Error while fetching total amount for the current day: ${error.message}`);
      throw new Error(`Error while fetching total amount: ${error.message}`);
    }
  }
  

  async findAllOrdersByCurrentDay(): Promise<Orders[] | string> {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    try {
      const orders = await this.OrderRepository.find({
        where: {
          OrderDate: Between(startOfDay, endOfDay),
        },
      });

      if (orders.length === 0) {
        return 'Oops! No orders available for today.';
      }
      return orders;
    } catch (error) {
      console.error(`Error while fetching for orders: ${error.message}`);
      throw new Error(`Error while fetching orders: ${error.message}`);
    }
  }

  async updateOrdersById(
    id: number,
    updatedOrderDetails: UpdateOrderParams,
  ): Promise<void> {
    try {
      const updateObject: Partial<UpdateOrderParams> = {};

      if (updatedOrderDetails.OrderNumber !== undefined) {
        updateObject.OrderNumber = updatedOrderDetails.OrderNumber;
      }

      if (updatedOrderDetails.CustomerName !== undefined) {
        updateObject.CustomerName = updatedOrderDetails.CustomerName;
      }

      if (updatedOrderDetails.Price !== undefined) {
        updateObject.Price = updatedOrderDetails.Price;
      }

      if (updatedOrderDetails.Location !== undefined) {
        updateObject.Location = updatedOrderDetails.Location;
      }

      if (updatedOrderDetails.ProductName !== undefined) {
        updateObject.ProductName = updatedOrderDetails.ProductName;
      }

      if (updatedOrderDetails.PhoneNumber !== undefined) {
        updateObject.PhoneNumber = updatedOrderDetails.PhoneNumber;
      }

      if (Object.keys(updateObject).length > 0) {
        await this.OrderRepository.update(id, updateObject);
      }
    } catch (error) {
      console.error(
        `Error while updating an order by ID: ${error.message}`,
      );
      throw new Error(`Error while updating an order by ID: ${error.message}`);
    }
  }

  async deleteOrderById(id: number, res: Response): Promise<{ isValid: boolean }> {
    try {
      const result = await this.OrderRepository.delete(id);
  
      if (result.affected && result.affected > 0) {
        console.log("order deleted")
        res.status(200).json({ isValid: true, message: 'Order deleted' });
        return { isValid: true };
      } else {
        res.status(404).json({ isValid: false, message: 'Order not found' });
        return { isValid: false };
      }
    } catch (error) {
      res.status(500).json({ isValid: false, message: 'An error occurred' });
      console.error(`Error while deleting an order: ${error.message}`);
      return { isValid: false };
    }
  }

  

}
