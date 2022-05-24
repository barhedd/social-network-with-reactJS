

//function to get only the info needed for the post in home
export const homePost = (postInfo) => {
    if (!postInfo)
        return null;

    return {
        id: postInfo._id,
        title: postInfo.title,
        image: postInfo.image
    }
}