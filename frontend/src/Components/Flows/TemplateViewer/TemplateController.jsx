import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify';
import Duda from '../../../Utilities/Duda';

export default function TemplateController(pageNumber) {

    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [templates, setTemplates] = useState([])
    const [allTemplates, setAllTemplates] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [total, setTotal] = useState(0)
    const pageLength = 10

    useEffect(() => {
        Auth.currentSession().then(user => {
            setSession(user.getIdToken().getJwtToken())
        });
    }, []);
    
    useEffect(() => {
        if (!session) return
        setLoading(true)
        Duda.getTemplates(session).then(result => {
            setAllTemplates(result);
            setTotal(result.length);
            setLoading(false);
        })
    }, [session]);

    useEffect(() => {
        setLoading(true)
        setTemplates(prevTemplates => {
            var results = []
            allTemplates.forEach((template,index) => {
                if (index >= (pageNumber*pageLength) && index < (pageNumber*pageLength)+pageLength) {
                    results.push(template)
                }
            })
            return prevTemplates.concat(results)
        })
        setHasMore(allTemplates.length > templates.length)
        setLoading(false)
    }, [pageNumber]);

    return { loading, templates, hasMore, total }

}