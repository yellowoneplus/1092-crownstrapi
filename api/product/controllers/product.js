"use strict";

const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  shopPage: async (ctx) => {
    const data = await strapi.services.product.find();
    console.log("data", data);
    return await ctx.render("products2_xx", {
      data,
      title: "Shop Products",
    });
  },

  categoryPage: async (ctx) => {
    const category = ctx.params.category;
    console.log("category", category);
    const cat = await strapi.services.category.findOne({ name: category });
    console.log("cat", category, cat.cid);
    const data = await strapi.connections.default.raw(
      `SELECT * FROM products where category = ${cat.cid}`
    );
    console.log("data", JSON.stringify(data));
    return await ctx.render("products2_xx", {
      data,
      title: ctx.params.category,
    });
  },
};
