exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id").unsigned().primary();
    table.string("vin", 13).notNullable().unique();
    table.string("make", 128).notNullable();
    table.string("model", 128).notNullable();
    table.decimal("mileage").notNullable();
    table.string("title");
    table.string("transmission");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
