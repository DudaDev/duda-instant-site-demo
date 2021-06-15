import React, {  useState, useRef, useCallback } from 'react'
import Duda from '../../../Utilities/Duda'
import { Helmet } from 'react-helmet'
import 'fontsource-roboto'
import TemplateController from './TemplateController';
import TemplateItem from './TemplateItem';
import { Container, Grid } from '@material-ui/core';

function TemplateViewer() {
  
    const [pageNumber, setPageNumber] = useState(0)
    const { 
        templates,
        hasMore,
        loading,
        total
    } = TemplateController(pageNumber)

    const observer = useRef()
    const ref = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(p => p + 1)
        }
      })
      if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <>
          <Helmet>
            <title>Templates</title>
          </Helmet>
          <Container style={{ marginTop: '40px', marginBottom:'140px' }}>
            <Grid container spacing={1}>
            { loading ? <p>Loading templates ...</p>
              : templates.map((template, index) => {
                if (templates.length === index + 1 && index + 1 !== total) {
                  return (
                    <>
                      <Grid item xs={6} sm={3}>
                        <TemplateItem template={template}/>
                        <div ref={ref}></div>
                      </Grid>
                    </>
                  )
                } else {
                  return (
                    <>
                        <Grid item xs={6} sm={3}>
                          <TemplateItem template={template} />
                        </Grid>
                    </>
                  )
                }
            })}
            </Grid>
          </Container>
        </>
    );
}

export default TemplateViewer;