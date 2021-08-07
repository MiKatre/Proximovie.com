const path = require("path")
const _ = require("lodash")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const genreTemplate = path.resolve("src/templates/genre.js")

  const result = await graphql(`
    {
      genresGroup: allMoviesJson(limit: 2000) {
        group(field: genres) {
          fieldValue
        }
      }
    }
  `)

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Extract tag data from query
  const genres = result.data.genresGroup.group

  // Make tag pages
  genres.forEach(genre => {
    createPage({
      path: `/genre/${_.kebabCase(genre.fieldValue)}/`,
      component: genreTemplate,
      context: {
        genre: genre.fieldValue,
      },
    })
  })
}