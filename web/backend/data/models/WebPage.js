import { WebPage } from "./WebPage"; // Import mô hình WebPage
import { Op } from "sequelize"; // Các toán tử cho Sequelize

// Define the repository class
class WebPageRepository {
  // Fetch all web pages with optional filters
  async findAll(filters?: any) {
    try {
      return await WebPage.findAll({
        where: filters,
      });
    } catch (error) {
      console.error("Error fetching web pages:", error);
      throw error;
    }
  }

  // Fetch a single web page by ID
  async findById(id: string) {
    try {
      return await WebPage.findByPk(id);
    } catch (error) {
      console.error(`Error fetching web page with ID ${id}:`, error);
      throw error;
    }
  }

  // Create a new web page
  async create(data: any) {
    try {
      return await WebPage.create(data);
    } catch (error) {
      console.error("Error creating web page:", error);
      throw error;
    }
  }

  // Update a web page by ID
  async update(id: string, data: any) {
    try {
      const webPage = await this.findById(id);
      if (webPage) {
        return await webPage.update(data);
      } else {
        throw new Error(`Web page with ID ${id} not found.`);
      }
    } catch (error) {
      console.error(`Error updating web page with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a web page by ID
  async delete(id: string) {
    try {
      const webPage = await this.findById(id);
      if (webPage) {
        return await webPage.destroy();
      } else {
        throw new Error(`Web page with ID ${id} not found.`);
      }
    } catch (error) {
      console.error(`Error deleting web page with ID ${id}:`, error);
      throw error;
    }
  }

  // Example method for searching by a specific attribute
  async searchByContent(content: string) {
    try {
      return await WebPage.findAll({
        where: {
          content: {
            [Op.iLike]: `%${content}%`, // Case-insensitive search
          },
        },
      });
    } catch (error) {
      console.error("Error searching web pages:", error);
      throw error;
    }
  }
}

export { WebPageRepository };
