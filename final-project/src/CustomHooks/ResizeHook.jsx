import { React, useState, useEffect } from 'react';


//Custom Hook created for rendering different components on resize
function useResize() {
    const [width, SetWidth] = useState(window.innerWidth);
    const [height, SetHeight] = useState(window.innerHeight);


    useEffect(() => {
        window.addEventListener('resize', () => {
            SetHeight(window.innerHeight);
            SetWidth(window.innerWidth);
        })

        //Cleaning up the event
        return () => {
            window.removeEventListener('resize', () => {
                SetHeight(window.innerHeight);
                SetWidth(window.innerWidth);
            })
        }
    }, [])

    //returning the current height and width
    return [height, width];


}

export default useResize;

