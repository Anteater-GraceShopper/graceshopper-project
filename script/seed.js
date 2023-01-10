"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      firstName: "Cody",
      lastName: "Pug",
    }),
    User.create({
      username: "murphy",
      password: "123",
      firstName: "Murphy",
      lastName: "Cat",
    }),
    User.create({
      username: "gomez",
      password: "123",
      firstName: "Gomez",
      lastName: "Chihuahua",
    }),
  ]);
  const products = [
    Product.create({
      name: "Honey Stinger Waffles",
      description:
        "A thin layer of our classic honey sandwiched between two thin waffles.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLaQakPkeR06wbHDkKX_eKfeVfXWQuU_vbng&usqp=CAU",
      price: 25.99,
      quantity: 200,
    }),
    Product.create({
      name: "Honey Nut Cheerios",
      description:
        "First ingredient. Made with real honey. Made with real honey & natural almond flavor. A-maze-ing taste starts here. A buzz-worthy choice! Real honey, a-maze-ing taste!",
      imageUrl: "https://m.media-amazon.com/images/I/81tro-cc6wL.jpg",
      price: 3.99,
      quantity: 200,
    }),
    Product.create({
      name: "Honey Nut Cheerios Crocs",
      description:
        "A limited edition classic Clog based on the beloved cereal Honey Nut Cheerios.",
      imageUrl:
        "https://media.crocs.com/images/t_pdphero/f_auto%2Cq_auto/products/207924_846_ALT110/crocs",
      price: 60.99,
      quantity: 30,
    }),
  ];
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  const product = await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      gomez: users[2],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
