import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ product }) => (
  <div className={styles.preview}>
    {product.images.map((image, index) => {
        return (
            <Img key={index} alt="" sizes={image.sizes} />
        )
    })}
    
    <h3 className={styles.previewTitle}>
      <Link to={`/product/${product.slug}`}>{product.title}</Link>
    </h3>
    <p>Quantity: {product.quantity}</p>
  </div>
)
