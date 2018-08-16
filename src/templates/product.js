import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'

import heroStyles from '../components/hero.module.css'

class ProductTemplate extends React.Component {
  render() {
    const product = get(this.props, 'data.contentfulProduct')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    console.log(product)
    product.images = product.images || []

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${product.title} | ${siteTitle}`} />
        <ul className={heroStyles.hero}>
        {product.images.map((image, index) => {
            return (
              <li key={index}>
                <Img key={index} alt={product.title} sizes={image.sizes} />
              </li>
            )
        })}
        </ul>
        <div className="wrapper">
          <h1 className="section-headline">{product.title}</h1>
          <p
            style={{
              display: 'block',
            }}
          >
            quantity: {product.quantity}
          </p>
        </div>
      </div>
    )
  }
}

export default ProductTemplate

export const pageQuery = graphql`
  query ProductBySlug($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      title
      slug
      images {
        sizes(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulSizes_withWebp
        }
      }
      quantity
    }
  }
`
