"use strict";

const {
  db,
  Cart,
  models: { User, Product, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const products = [
  {
    name: "Honey Stinger Waffles",
    description:
      "With no artificial sweeteners, colors, or preservatives, Honey Stinger energy waffles sweeten the burn to push through any challenge.",
    imageUrl: "https://m.media-amazon.com/images/I/61TvdNAwviL.jpg",
    price: 26.99,
    quantity: 200,
  },
  {
    name: "Honey Nut Cheerios",
    description:
      "First ingredient. Made with real honey. Made with real honey & natural almond flavor. A-maze-ing taste starts here.",
    imageUrl: "https://m.media-amazon.com/images/I/81tro-cc6wL.jpg",
    price: 4.99,
    quantity: 200,
  },
  {
    name: "Honey Nut Cheerios Crocs",
    description:
      "A limited edition classic Clog based on the beloved cereal Honey Nut Cheerios.",
    imageUrl:
      "https://media.crocs.com/images/t_pdphero/f_auto%2Cq_auto/products/207924_846_ALT110/crocs",
    price: 80.99,
    quantity: 30,
  },
  {
    name: "Raw Honeycomb",
    description: "Organic, raw honeycomb harvested in California. One piece.",
    imageUrl:
      "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/honeycomb-1296x728-feature.jpg?w=1155&h=1528",
    price: 29.99,
    quantity: 200,
  },
  {
    name: "Burt's Bees Lip Balm",
    description: "Variety pack. Each lip balm is 100% natural.",
    imageUrl: "https://m.media-amazon.com/images/I/81li5b5WfVL.jpg",
    price: 14.99,
    quantity: 200,
  },
  {
    name: "Lavender & Honey Handcream",
    description:
      "Burt’s Bees® Hand Cream with Shea Butter softens dry hands and indulges the senses with the relaxing scent of Lavender & Honey.",
    imageUrl:
      "https://i5.walmartimages.com/asr/3b2226e2-baa9-4034-bf8b-736e19ffeeed.0c927204e0d8f5c6f0ea5fe182274293.jpeg",
    price: 8.99,
    quantity: 200,
  },
  {
    name: "Honey and Bilberry Foot Cream",
    description:
      "From Burt's Bees. Gently exfoliate and intensely moisturize dry, overworked feet with this all-in-one cream.",
    imageUrl: "https://images.heb.com/is/image/HEBGrocery/001033835",
    price: 13.99,
    quantity: 10,
  },
  {
    name: "Wanna Bee Eyeshadow Palette",
    description:
      "From Colourpop. Features a mix of yellows, oranges, and rich chocolate matte and shimmery finishes.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1338/0845/products/6806968008786-Wanna-Bee-EyePalette-WannaBee-3_800x1200.jpg?v=1668570974",
    price: 17.99,
    quantity: 60,
  },
  {
    name: "Mystery Gift Box",
    description:
      "A mystery box for the honey lover in your life. May contain honey merchandise, skincare, or snacks. $70 value!",
    imageUrl:
      "https://cdn-fsly.yottaa.net/59ae940432f01c7cce962145/www.burtsbees.com/v~4b.15b/on/demandware.static/-/Sites-burtsbees-master-catalog/default/dw8006032f/images/2022/2022-12-mysterybox.jpg?yocs=2h_2l_",
    price: 44.99,
    quantity: 60,
  },
  {
    name: "Honey Soap",
    description: "Honey soap with jojoba oil",
    imageUrl: "https://www.betterbee.com/images/soapn1_l.jpg",
    price: 8.99,
    quantity: 200,
  },
  {
    name: "Honey Bun Candle",
    description:
      "Fill your home with the smell of Little Debbie Honey Buns. Available for a limited time in a 14-ounce soy wax tin.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2394/2207/products/Little_Debbie_Honey_Bun_Candle_GroupShot_E.jpg?v=1653077409&width=1445",
    price: 29.99,
    quantity: 200,
  },
  {
    name: "Honey Buns",
    description:
      "Soft, golden and tasty, Little Debbie Honey Buns are prepared with cinnamon, honey, and a light glaze.",
    imageUrl: "https://m.media-amazon.com/images/I/81JHp82ZI5L.jpg",
    price: 35.99,
    quantity: 200,
  },
  {
    name: "Organic Bee Pollen",
    description:
      "Bee pollen is considered by renowned healthcare specialists & nutrition experts to be a superfood fit for a modern lifestyle.",
    imageUrl: "https://m.media-amazon.com/images/I/81RX6OedCbL._AC_SX679_.jpg",
    price: 20.99,
    quantity: 200,
  },
  {
    name: "Bee Push Pins",
    description: "40 pcs. Bees made of resin, pins made of metal.",
    imageUrl: "https://m.media-amazon.com/images/I/71xEzUTJyxL._AC_SX679_.jpg",
    price: 15.99,
    quantity: 200,
  },
  {
    name: "Honey Sticks",
    description: "Great for sweetening tea or coffee! Also a tasty snack.",
    imageUrl:
      "https://m.media-amazon.com/images/I/81HmRfj+RcL._SX679_PIbundle-100,TopRight,0,0_AA679SH20_.jpg",
    price: 25.99,
    quantity: 200,
  },
  {
    name: "Pure Raw Honey",
    description: "Bee flower honey perfect for helping out the immune system.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0271/6345/9637/products/hg-organic-1lb--ff5849ef-1471b8d9.jpg?v=1661966478&width=2400",
    price: 40.99,
    quantity: 200,
  },
  {
    name: "Honey Stinger Nut and Seed Bar",
    description:
      "Recover from tough workouts with the right balance of sweet and salty in the Almond Pumpkin Seed Nut + Seed Bar.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0498/2374/4162/products/VarietyPack_Bars-Nut_Seed_4Pk_1000x.jpg?v=1648512848",
    price: 33.99,
    quantity: 200,
  },
];
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  const product = await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      first: "Cody",
      last: "Pug",
      isAdmin: true,
    }),
    User.create({
      username: "murphy",
      password: "123",
      first: "Murphy",
      last: "Cat",
    }),
    User.create({
      username: "gomez",
      password: "123",
      first: "Gomez",
      last: "Chihuahua",
    }),
  ]);

  const order = await Promise.all([
    Order.create({
      isComplete: true,
    }),
  ]);

  const cart = await Promise.all([
    Cart.create({
      itemCount: 2,
      productId: 2,
      orderId: 1,
    }),
  ]);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

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
