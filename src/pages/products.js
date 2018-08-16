import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import ProductPreview from '../components/product-preview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulProduct.edges')

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className={styles.hero}>
          Products
        </div>
        <div className="wrapper">
          <h2 className="section-headline">Products in alphabetic order</h2>
          <ul className="article-list">
            {posts.map(({ node }) => {
              console.log(node.images)
              node.images = node.images || []
              return (
                <li key={node.title}>
                  <ProductPreview product={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query ProductsIndexQuery {
    allContentfulProduct(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          title
          slug
          images {
            sizes(maxWidth: 100, maxHeight: 100, resizingBehavior: SCALE) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          quantity
          brand {
              companyName
          }
        }
      }
    }
  }
`
