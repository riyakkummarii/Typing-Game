import React from "react";
import faker from "faker";

function generate() {
  const count = 10;
  return new Array(count)
    .fill()
    .map((_) => faker.random.word())
    .join(" ");
}
export default generate;
