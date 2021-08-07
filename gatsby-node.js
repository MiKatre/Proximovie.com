const path = require("path")
const _ = require("lodash")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const genreTemplate = path.resolve("src/templates/genre.js")
  const personTemplate = path.resolve("src/templates/person.js")

  const result = await graphql(`
    {
      genresGroup: allMoviesJson(limit: 2000) {
        group(field: genres) {
          fieldValue
        }
      }
      castGroup: allMoviesJson(limit: 2000) {
        group(field: cast) {
          fieldValue
        }
      }
      crewGroup: allMoviesJson(limit: 2000) {
        group(field: crew) {
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
  const persons = [...result.data.castGroup.group,...result.data.crewGroup.group]

  // Make genre pages
  genres.forEach(genre => {
    createPage({
      path: `/genre/${_.kebabCase(genre.fieldValue)}/`,
      component: genreTemplate,
      context: {
        genre: genre.fieldValue,
      },
    })
  })

  // Make person pages
  persons.forEach(person => {
    createPage({
      path: `/person/${_.kebabCase(person.fieldValue)}/`,
      component: personTemplate,
      context: {
        person: person.fieldValue,
      },
    })
  })
}