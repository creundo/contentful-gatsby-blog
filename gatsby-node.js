const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const blogPosts = new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })

  const products = new Promise((resolve, reject) => {
    const product = path.resolve('./src/templates/product.js')
    resolve(
      graphql(
        `
          {
            allContentfulProduct {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulProduct.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/product/${post.node.slug}/`,
            component: product,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })

  return Promise.all([blogPosts, products])
}