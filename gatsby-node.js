const path = require("path")
const _ = require("lodash")

function slugify(slug) {
    if (!slug){
      return ''
    }
    return slug.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g,'-').replace(/[^\w-]+/g,'')
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const genreTemplate = path.resolve("src/templates/genre.js")
  const genreTVTemplate = path.resolve("src/templates/genreTV.js")
  const personTemplate = path.resolve("src/templates/person.js")
  const countryTemplate = path.resolve("src/templates/country.js")
  const companyTemplate = path.resolve("src/templates/company.js")
  const keywordTemplate = path.resolve("src/templates/keyword.js")
  const keywordTVTemplate = path.resolve("src/templates/keywordTV.js")

  const result = await graphql(`
    {
      genresGroup: allMoviesJson(limit: 2000) {
        group(field: genres) {
          fieldValue
        }
      }
      tvGenresGroup: allShowsJson(limit: 1000) {
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
      countryGroup: allMoviesJson(limit: 2000) {
        group(field: production_countries) {
          fieldValue
        }
      }
      companyGroup: allMoviesJson(limit: 2000) {
        group(field: production_companies) {
          fieldValue
        }
      }
      keywordsGroup: allMoviesJson(limit: 4000) {
        group(field: keywords) {
          fieldValue
          totalCount
        }
      }
      tvKeywordsGroup: allShowsJson(limit: 4000) {
        group(field: keywords) {
          fieldValue
          totalCount
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
  const genres = [...result.data.genresGroup.group, ...result.data.tvGenresGroup.group]
  const persons = [...result.data.castGroup.group,...result.data.crewGroup.group]
  const countries = result.data.countryGroup.group
  const companies = result.data.companyGroup.group
  const keywords = [...result.data.keywordsGroup.group, ...result.data.tvKeywordsGroup.group]

  // Make genre pages
  genres.forEach(genre => {
    createPage({
      path: `/genre/${slugify(genre.fieldValue)}/`,
      component: genreTemplate,
      context: {
        genre: genre.fieldValue,
      },
    }),
    createPage({
      path: `/genre/${slugify(genre.fieldValue)}/tv`,
      component: genreTVTemplate,
      context: {
        genre: genre.fieldValue,
      },
    })
  })


  // const postsPerPage = 6
  // const numPages = Math.ceil(posts.length / postsPerPage)
  
  // Make keword pages
  keywords.forEach(keyword => {
    createPage({
      path: `/keyword/${slugify(keyword.fieldValue)}/`,
      component: keywordTemplate,
      context: {
        keyword: keyword.fieldValue,
      },
      defer: false,
    }),
    createPage({
      path: `/keyword/${slugify(keyword.fieldValue)}/tv`,
      component: keywordTVTemplate,
      context: {
        keyword: keyword.fieldValue,
      },
      defer: false,
    })
  })



  // Make person pages
  persons.forEach(person => {
    createPage({
      path: `/person/${slugify(person.fieldValue)}/`,
      component: personTemplate,
      context: {
        person: person.fieldValue,
      },
      defer: false,
    })
  })

  // Make country pages
  countries.forEach(country => {
    createPage({
      path: `/country/${slugify(country.fieldValue)}/`,
      component: countryTemplate,
      context: {
        country: country.fieldValue,
      },
    })
  })

  // Make company pages
  companies.forEach(company => {
    createPage({
      path: `/company/${slugify(company.fieldValue)}/`,
      component: companyTemplate,
      context: {
        company: company.fieldValue,
      },
    })
  })
}


// exports.createSchemaCustomization = ({ actions: { createTypes, printTypeDefinitions } }) => {
//   printTypeDefinitions({ path: './typeDefs.txt' })
// }





// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//     }
//     type Frontmatter {
//       author: AuthorJson @link # default foreign-key relation by id
//       reviewers: [AuthorJson] @link(by: "email") # foreign-key relation by custom field
//     }
//     type AuthorJson implements Node {
//       posts: [MarkdownRemark] @link(by: "frontmatter.author.email", from: "email") # easy back-ref
//     }
//   `
//   createTypes(typeDefs)
// }