import * as React from 'react'
import Layout from 'src/components/layout'
import Seo from 'src/components/layout/seo'
import Task from 'src/components/task'
const IndexPage = () => {
  return (
    <Layout>
      <Seo title='Home' />
      <Task />
    </Layout>
  )
}

export default IndexPage
