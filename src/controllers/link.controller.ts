import { Request, Response } from 'express';
import Link from '../models/link.model';
import { logger } from '../utils/logger';
import { validateUrl } from '../utils/validation';
import { ILink } from '../types/express';

export const createLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, url, icon, description, category } = req.body;

    // Validation
    if (!title || !url) {
      res.status(400).json({
        success: false,
        message: 'Title and URL are required.',
      });
      return;
    }

    if (!validateUrl(url)) {
      res.status(400).json({
        success: false,
        message: 'Invalid URL format.',
      });
      return;
    }

    const link = new Link({
      title: title.trim(),
      url: url.trim(),
      icon: icon?.trim(),
      description: description?.trim(),
      category: category?.trim(),
    });

    await link.save();
    logger.info(`Link created: ${title}`);

    res.status(201).json({
      success: true,
      message: 'Link created successfully.',
      data: link,
    });
  } catch (error: any) {
    logger.error('Error creating link', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating link.',
    });
  }
};

export const updateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, url, icon, description, category } = req.body;

    // Validation
    if (!title && !url) {
      res.status(400).json({
        success: false,
        message: 'At least title or URL must be provided.',
      });
      return;
    }

    if (url && !validateUrl(url)) {
      res.status(400).json({
        success: false,
        message: 'Invalid URL format.',
      });
      return;
    }

    const updateData: Partial<ILink> = {};
    if (title) updateData.title = title.trim();
    if (url) updateData.url = url.trim();
    if (icon !== undefined) updateData.icon = icon.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (category !== undefined) updateData.category = category.trim();

    const link = await Link.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!link) {
      res.status(404).json({
        success: false,
        message: 'Link not found.',
      });
      return;
    }

    logger.info(`Link updated: ${link.title}`);

    res.status(200).json({
      success: true,
      message: 'Link updated successfully.',
      data: link,
    });
  } catch (error: any) {
    logger.error('Error updating link', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating link.',
    });
  }
};

export const getAllLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Links retrieved successfully.',
      data: links,
    });
  } catch (error) {
    logger.error('Error fetching links', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching links.',
    });
  }
};

export const getLinkById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const link = await Link.findById(id);
    if (!link) {
      res.status(404).json({
        success: false,
        message: 'Link not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Link retrieved successfully.',
      data: link,
    });
  } catch (error) {
    logger.error('Error fetching link', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching link.',
    });
  }
};

export const deleteLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const link = await Link.findByIdAndDelete(id);
    if (!link) {
      res.status(404).json({
        success: false,
        message: 'Link not found.',
      });
      return;
    }

    logger.info(`Link deleted: ${link.title}`);

    res.status(200).json({
      success: true,
      message: 'Link deleted successfully.',
      data: { deletedId: id },
    });
  } catch (error) {
    logger.error('Error deleting link', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting link.',
    });
  }
};