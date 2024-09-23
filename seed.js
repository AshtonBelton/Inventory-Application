const db = require('./config/db');

const categories = [
    { name: 'Electronics', description: 'Gadgets and devices' },
    { name: 'Books', description: 'A variety of books' },
    { name: 'Furniture', description: 'Home and office furniture' }
];

const items = [
    { name: 'Laptop', description: 'Portable computer', price: 899.99, quantity: 50, category_id: 1 },
    { name: 'Smartphone', description: 'Mobile device', price: 699.99, quantity: 100, category_id: 1 },
    { name: 'Mystery Novel', description: 'A thrilling mystery', price: 19.99, quantity: 200, category_id: 2 },
    { name: 'Chair', description: 'Comfortable office chair', price: 89.99, quantity: 30, category_id: 3 }
];

async function seedCategories() {
    try {
        for (const category of categories) {
            await db.query('INSERT INTO categories (name, description) VALUES ($1, $2)', [category.name, category.description]);
        }
        console.log('Categories seeded successfully!');
    } catch (err) {
        console.error('Error seeding categories:', err);
    }
}

async function seedItems() {
    try {
        for (const item of items) {
            await db.query(
                'INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5)',
                [item.name, item.description, item.price, item.quantity, item.category_id]
            );
        }
        console.log('Items seeded successfully!');
    } catch (err) {
        console.error('Error seeding items:', err);
    }
}

async function seedDatabase() {
    await seedCategories();
    await seedItems();
    db.end(); 
}

seedDatabase();