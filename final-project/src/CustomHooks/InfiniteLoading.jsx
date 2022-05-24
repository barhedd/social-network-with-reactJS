import { useState, useEffect, useRef } from "react";
import useInView from "react-cool-inview";


//Component created to add an infinite loading for mobile formatting 
export const useInfiniteLoading = ({ prevItems = [], getter = () => { }, token, limit = 10, page = 0 }) => {

    const getItems = getter;
    const [items, SetItems] = useState([]);
    const pageToLoad = useRef(page);
    //creates a mutable state
    const initialPageLoaded = useRef(false);
    const [hasMore, SetHasMore] = useState(true);
    const [rendered, SetRendered] = useState(false)







    const loadItems = async (actualPage) => {
        try {
            const response = await getItems(token, limit, actualPage);


            const data = response['data'];
            SetHasMore(response['pages'] > pageToLoad.current);
            SetRendered(true);
            if (Array.isArray(items))
                SetItems(prevItems => [...prevItems, ...data]);
            else
                SetItems(data)

        } catch (error) {
            console.log(error)
        }
    };

    const loadNext = () => {
        pageToLoad.current = Number(pageToLoad.current) + 1;
        loadItems(pageToLoad.current);
    }

    //Observer to load automatically the next batch of posts
    const { observe } = useInView({
        onEnter: () => {
            loadNext()
        }
    })

    useEffect(() => {
        if (initialPageLoaded.current)
            return;

        loadItems();
        initialPageLoaded.current = true;
    }, [loadItems]);





    return {
        items,
        hasMore,
        loadItems,
        loadNext,
        rendered,
        loadMoreRef: observe
    };

}

