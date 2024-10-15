import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, Res, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, selectedDateDTO, UpdateOrderDto } from './DTO/Order.dto';
import { Orders } from 'src/Entities/Order.Entity';
import { Response } from 'express';


@Controller('orders')
@ApiTags("ORDERS")
export class OrdersController {
  constructor(private ordersService: OrdersService) { }


  @Post('/add')
  @ApiOperation({ summary: 'create a new order ' })
  @ApiResponse({ status: 201, description: 'New Order created successfully' })
  async createNewOrder (@Body() OrderDTO: CreateOrderDto) {
    try {
      console.log(
        'Incoming finance items:',
        JSON.stringify(OrderDTO, null, 2),
      ); // Log entire request body
      const result =
        await this.ordersService.createOrders(OrderDTO);
      return {
        message: 'order created successfully',
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error creating an order:', error);
      throw error;
    }
  }


  @Get('total-amount-today')
  @ApiOperation({
    summary: 'Get total amount  for the current day',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns total amount for the current day',
  })


  @Get('total-amount-today')
  async getTotalAmountToday(): Promise<{ totalAmount: number }> {
    const totalAmount = await this.ordersService.findTotalAmountOfCurrentDay();
    return { totalAmount };
  }

  @Get('search/:orderNumber')
  async getOrderByOrderNumber(@Param('orderNumber') orderNumber: string): Promise<Orders | string> {
    return await this.ordersService.findOrderByOrderNumber(orderNumber);
  }




  @Get('/allorders')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description:'return all orders' })
  async GetAllOrders() {
    return await this.ordersService.GetAllOrders();
  }




  @Get(':Ordername')
      @ApiOperation({ summary: 'Search order by name' })
      @ApiResponse({ status: 200, description: 'order found successfully' })
      async GetOrdersByName(@Param('name') name: string): Promise<Orders[] | string> {
        if (!name) {
          return 'Name is not provided';
        }
      
        const results = await this.ordersService.findOrdersByName(name);
      
        if (results.length === 0) {
          return 'order not found';
        }
      
        return results;
      }




    
  @Get('/day')
  @ApiOperation({summary:'Get all orders for the current day'})
  @ApiResponse({ status: 200, description: 'return all orders by current day ' })
  async getOrdersByDay():Promise<Orders[] | string> {
    return  await this.ordersService.findAllOrdersByCurrentDay();
  }

  

  @Get('byselectedDate')
  @ApiOperation({
    summary: 'Get financial transaction by selected date',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns financial transaction by selected date',
  })

  
  
  async getOrderTransactionsSelectedByDate(@Query() selectedDateDTO: selectedDateDTO) {
    const { date } = selectedDateDTO; // Extract the date from the DTO
    console.log(`Request received for date: ${date}`);  // Logging the incoming request
    try {
      const Ordertransactions = await this.ordersService.findOrdersTransactionBySelectedDate(date);
      return Ordertransactions;
    } catch (error) {
      console.error('Error retrieving order transactions:', error);
      return {
        message: 'Error retrieving order transactions for the selected date.',
        error: error.message,
      };
    }
  }

  @Put(':id')

  @ApiOperation({ summary: 'Update orders' })
  @ApiResponse({ status: 200, description: 'order updated successfully' })
  async updateOrdersById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedOrderDto: UpdateOrderDto,
  ): Promise<{ message: string }> {
    await this.ordersService.updateOrdersById(
      id,
      updatedOrderDto,
    );
    return { message: 'order updated successfully' };
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete orders' })
  @ApiResponse({ status: 200, description: 'order deleted successfully' })
  async deleteOrdersById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const result = await this.ordersService.deleteOrderById(id, res);
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.error('Error occurred:', error);
    throw new InternalServerErrorException('Internal server error');
  }











}