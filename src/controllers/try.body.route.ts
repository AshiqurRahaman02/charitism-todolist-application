import { Request, Response } from 'express';
import TryBodyModel from '../models/test.body.model';

// Define the route handler function
export const createTryBody = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTryBody = new TryBodyModel({body:req.body});

    const savedTryBody = await newTryBody.save();

    res.status(201).json({ message: 'Body saved successfully', savedTryBody });
  } catch (error) {
    // Handle any errors and send an error response
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
