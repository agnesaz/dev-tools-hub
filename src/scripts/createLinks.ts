import mongoose from 'mongoose';
import Link from '../models/link.model';
import { config } from 'dotenv';

config();

const seedLinks = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dev-tools-hub');
    console.log(' Connected to MongoDB');

    // Clear existing links
    await Link.deleteMany({});
    console.log(' Cleared existing links');

    // Sample links for developers
    const links = [
      {
        title: 'GitHub',
        url: 'https://github.com',
        icon: '🐙',
        description: 'Version control and collaboration platform',
        category: 'Development',
      },
      {
        title: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        icon: '❓',
        description: 'Q&A community for developers',
        category: 'Learning',
      },
      {
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        icon: '📚',
        description: 'Web technology documentation',
        category: 'Learning',
      },
      {
        title: 'NPM Registry',
        url: 'https://npmjs.com',
        icon: '📦',
        description: 'JavaScript package registry',
        category: 'Tools',
      },
      {
        title: 'Docker Hub',
        url: 'https://hub.docker.com',
        icon: '🐳',
        description: 'Container image repository',
        category: 'DevOps',
      },
      {
        title: 'MongoDB Atlas',
        url: 'https://www.mongodb.com/cloud/atlas',
        icon: '🍃',
        description: 'Cloud database service',
        category: 'Database',
      },
    ];

    const result = await Link.insertMany(links);
    console.log(` Created ${result.length} sample links`);

    console.log('\n Seeded Links:');
    result.forEach((link) => {
      console.log(`   ${link.icon} ${link.title} - ${link.category}`);
    });

    await mongoose.connection.close();
    console.log('\n Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding links:', error);
    process.exit(1);
  }
};

seedLinks();