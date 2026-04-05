export function validateMenuPayload(payload) {
  const requiredFields = ["name", "description", "price", "category", "image_url", "rating"];
  const missingField = requiredFields.find(
    (field) => payload[field] === undefined || payload[field] === ""
  );

  if (missingField) {
    return `Missing required field: ${missingField}`;
  }

  if (Number.isNaN(Number(payload.price)) || Number(payload.price) <= 0) {
    return "Price must be a positive number.";
  }

  if (Number.isNaN(Number(payload.rating)) || Number(payload.rating) < 1 || Number(payload.rating) > 5) {
    return "Rating must be between 1 and 5.";
  }

  return null;
}

