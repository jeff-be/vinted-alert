function convertToSlug(Text) {
    return Text.replace("'", '%27')
               .replace(/ /g, '-')
  }

  module.exports = {
    convertToSlug,
}