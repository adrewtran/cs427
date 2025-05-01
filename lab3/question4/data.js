"use strict";

// Array to store the items
let data = [];

export function get_items() {
  return data;
}

export function add_item(new_item) {
  if (typeof new_item !== 'object' || new_item === null || typeof new_item.id === 'undefined') {
    console.error("Invalid item object provided. Item must have an 'id' property.");
    return false;
  }

  const existingItem = data.find(item => item.id === new_item.id);

  if (existingItem) {
    console.log(`Item with ID ${new_item.id} already exists. Item not added.`);
    return false;
  }

  data.push(new_item);
  console.log(`Item with ID ${new_item.id} added successfully.`);
  return true;
}


export function update_item_title_by_id(id, new_title) {
  const itemIndex = data.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    console.log(`Item with ID ${id} not found. Title not updated.`);
    return false;
  }

  if (typeof new_title !== 'string') {
      console.error("Invalid new title provided. Title must be a string.");
      return false;
  }

  data[itemIndex].title = new_title;
  console.log(`Title for item with ID ${id} updated successfully.`);
  return true;
}

export function delete_item_by_id(id) {
  const initialLength = data.length;

  data = data.filter(item => item.id !== id);

  if (data.length < initialLength) {
    console.log(`Item with ID ${id} deleted successfully.`);
    return true;
  } else {
    console.log(`Item with ID ${id} not found. No item deleted.`);
    return false;
  }
}

export function get_item_title_by_id(id) {
  const item = data.find(item => item.id === id);

  if (item) {
    console.log(`Found item with ID ${id}. Title: "${item.title}"`);
    return item.title;
  } else {
    console.log(`Item with ID ${id} not found.`);
    return undefined;
  }
}
