// import { WebPage } from "../models/WebPage"; // Import mô hình WebPage
// import { sequelize } from "../config/database"; // Import kết nối Sequelize

const seedWebPages = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log("Database connected.");

    // Define sample data
    const webPages = [
      {
        title: "Welcome to YFood",
        content: "Discover delicious food from around the world.",
        imageUrl: "https://example.com/images/welcome.jpg",
        linkUrl: "https://yfood.com/welcome",
        metadata: {
          author: "YFood Team",
          datePublished: new Date(),
        },
      },
      {
        title: "Special Offers",
        content: "Check out our latest special offers and discounts.",
        imageUrl: "https://example.com/images/offers.jpg",
        linkUrl: "https://yfood.com/offers",
        metadata: {
          author: "YFood Team",
          datePublished: new Date(),
        },
      },
    ];

    // Insert data into the table
    for (const page of webPages) {
      await WebPage.create(page);
      console.log(`Inserted page: ${page.title}`);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Execute the seeding script
seedWebPages();
