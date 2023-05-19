function validateImageLink(imageLink) {
  return typeof imageLink === 'string' && imageLink.trim().length > 0;
}

module.exports = {
  validateImageLink,
};