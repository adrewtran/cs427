// --- Test Cases ---

import {
    add_item,
    get_items,
    get_item_title_by_id,
    update_item_title_by_id,
    delete_item_by_id
} from './data.js';

console.log("--- Initial Data ---");
console.log(get_items());

console.log("\n--- Adding Items ---");
console.log("Adding item 1:", add_item({ id: 1, title: "First Item", value: 10 }));
console.log("Adding item 2:", add_item({ id: 2, title: "Second Item", value: 20 }));
console.log("Adding item 1 again:", add_item({ id: 1, title: "Duplicate Item", value: 100 }));
console.log("Adding invalid item:", add_item({ title: "No ID" }));

console.log("\n--- Data After Adding ---");
console.log(get_items());

console.log("\n--- Getting Item Title by ID ---");
console.log("Title for ID 1:", get_item_title_by_id(1));
console.log("Title for ID 2:", get_item_title_by_id(2));
console.log("Title for ID 3:", get_item_title_by_id(3));

console.log("\n--- Updating Item Title by ID ---");
console.log("Updating title for ID 1:", update_item_title_by_id(1, "Updated First Item"));
console.log("Updating title for ID 3:", update_item_title_by_id(3, "NonExistent Title"));
console.log("Updating title for ID 1 with invalid type:", update_item_title_by_id(1, 123));

console.log("\n--- Data After Updating ---");
console.log(get_items());

console.log("\n--- Deleting Items by ID ---");
console.log("Deleting item with ID 2:", delete_item_by_id(2));
console.log("Deleting item with ID 3:", delete_item_by_id(3));

console.log("\n--- Data After Deleting ---");
console.log(get_items());

console.log("\n--- Final Check ---");
console.log("Getting items one last time:", get_items());
console.log("Getting title for deleted item ID 2:", get_item_title_by_id(2));
