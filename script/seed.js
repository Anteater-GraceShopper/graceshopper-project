"use strict";

const {
  db,
  models: { User, Product, Cart, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const products = [
  {
    name: "Honey Stinger Waffles",
    description:
      "A thin layer of our classic honey sandwiched between two thin waffles.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLaQakPkeR06wbHDkKX_eKfeVfXWQuU_vbng&usqp=CAU",
    price: 26.99,
    quantity: 200,
  },
  {
    name: "Honey Nut Cheerios",
    description:
      "First ingredient. Made with real honey. Made with real honey & natural almond flavor. A-maze-ing taste starts here. A buzz-worthy choice! Real honey, a-maze-ing taste!",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCshP1wweVjqWsK3RB0Tx9S8g-t0sHsdg4l2dS_2SkbUvI955hT7Qi3jFRHmTJ1HbHSWo&usqp=CAU",
    price: 29.99,
    quantity: 200,
  },
  {
    name: "Burt's Bees Lip Balm",
    description:
      "Variety pack. Each lip balm is 100% natural origin and power-packed with responsibly sourced Beeswax to condition and antioxidant-rich Vitamin E to richly moisturize and soften dry lips.",
    imageUrl: "https://m.media-amazon.com/images/I/81li5b5WfVL.jpg",
    price: 14.99,
    quantity: 200,
  },
  {
    name: "Burt's Bees Lavender & Honey Handcream",
    description:
      "Burt’s Bees® Hand Cream with Shea Butter softens dry hands and indulges the senses with the relaxing scent of Lavender & Honey. This luxurious hand cream nourishes hands with all day moisture and a rich buttery texture that goes on smoothly and leaves hands feeling silky smooth.",
    imageUrl:
      "https://i5.walmartimages.com/asr/3b2226e2-baa9-4034-bf8b-736e19ffeeed.0c927204e0d8f5c6f0ea5fe182274293.jpeg",
    price: 8.99,
    quantity: 200,
  },
  {
    name: "Burt's Bees Honey and Bilberry Foot Cream",
    description:
      "Gently exfoliate and intensely moisturize dry, overworked feet with this all-in-one cream. Bilberry Extract works to soften calluses while Honey, Jojoba Butter and Rosemary Extract replenish moisture—making this the newest essential in your self-care regimen.",
    imageUrl: "https://images.heb.com/is/image/HEBGrocery/001033835",
    price: 13.99,
    quantity: 10,
  },
  {
    name: "Wanna Bee Colourpop Eyeshadow Palette",
    description:
      "Get buzz-worthy colour with this palette full of warm, yummy neutrals. Features a mix of yellows, oranges, and rich chocolate in buttery matte and shimmering metallic finishes for the most bee-autiful looks.",
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
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXS94PrLCIevExJ1Ui9D4GTeJpSVq5vlxJg&usqp=CAU",
    price: 8.99,
    quantity: 200,
  },
  {
    name: "Honey Bun Candle",
    description:
      "Fill your home with the smell of Little Debbie Honey Buns. It’s the ideal way to enjoy a sweet warmth that only true Honey Bun fans will recognize. Trust us, this candle is a new classic that is perfect for gifting or treating yourself to. Available for a limited time in a 14-ounce soy wax tin.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2394/2207/products/Little_Debbie_Honey_Bun_Candle_GroupShot_E.jpg?v=1653077409&width=1445",
    price: 29.99,
    quantity: 200,
  },
  {
    name: "Honey Buns",
    description:
      "Soft, golden and tasty, Little Debbie Honey Buns are the sweet and flavorful snack that satisfies all day. Prepared with hints of cinnamon, a touch of honey, and dripping with a light glaze, it’s easy to understand why this delicious pastry swirl is a Little Debbie favorite.",
    imageUrl:
      "https://m.media-amazon.com/images/I/61RMCjZhJSL._SX679_PIbundle-8,TopRight,0,0_SX679SY382SH20_.jpg",
    price: 35.99,
    quantity: 200,
  },
  {
    name: "Organic Bee Pollen",
    description:
      "Bee pollen is considered by renowned healthcare specialists & nutrition experts to be a superfood fit for modern, fast-paced & hectic lifestyle.",
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
    imageUrl: "https://m.media-amazon.com/images/I/71n+lbqsTKL._SY606_.jpg",
    price: 40.99,
    quantity: 200,
  },
  {
    name: "Honey Stinger Nut and Seed Bar",
    description:
      "Recover from tough workouts with the right balance of sweet and salty in the Almond Pumpkin Seed Nut + Seed Bar. Includes honey for the sweetness you crave and the crunch of roasted almonds and pumpkin seeds for a satiating recharge.",
    imageUrl:
      "https://m.media-amazon.com/images/I/41ChyFikMEL._SX300_SY300_QL70_FMwebp_.jpg",
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
