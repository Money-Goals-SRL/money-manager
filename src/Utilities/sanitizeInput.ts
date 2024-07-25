function sanitizeInput(input: string) {
  // Replace any HTML tags with empty strings
  return input.replace(/<[^>]*>/g, "");
}

export default sanitizeInput;
