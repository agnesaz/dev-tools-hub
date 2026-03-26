import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import { logger } from '../utils/logger';
import { validateUsername, validatePassword } from '../utils/validation';
import { JWTPayload } from '../types/express';

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
      return;
    }

    if (!validateUsername(username)) {
      res.status(400).json({
        success: false,
        message: 'Invalid username format (3-50 characters).',
      });
      return;
    }

    if (!validatePassword(password)) {
      res.status(400).json({
        success: false,
        message: 'Invalid password format (minimum 6 characters).',
      });
      return;
    }

    // Find admin
    const admin = await Admin.findOne({ username }).select('+password');
    if (!admin) {
      logger.warn(`Login attempt with non-existent username: ${username}`);
      res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
      return;
    }

    // Compare password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      logger.warn(`Failed login attempt for username: ${username}`);
      res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
      return;
    }

    // Generate JWT
    const payload: JWTPayload = {
      id: admin._id?.toString() || '',
      username: admin.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h',
    });

    logger.info(`Admin logged in: ${username}`);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: { token, admin: { id: admin._id, username: admin.username } },
    });
  } catch (error) {
    logger.error('Login error', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
    });
  }
};