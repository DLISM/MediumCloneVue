import addToFavoritesApi from '@/API/addToFavorite'

export const mutationTypes= {
    addToFavoritesStart: '[addToFavorite] Add to favorites start',
    addToFavoritesSuccess: '[addToFavorite] Add to favorites success',
    addToFavoritesFailure: '[addToFavorite] Add to favorites failure',
}
export const actionTypes={
    addToFavorites:'[addToFavorite] Add to favorites'
}

const mutation ={
    [mutationTypes.addToFavoritesStart](){},
    [mutationTypes.addToFavoritesSuccess](){},
    [mutationTypes.addToFavoritesFailure](){},
}

const actions={
    [actionTypes.addToFavorites](context, {slug, isFavorited}){
        return new Promise(resolve => {
            context.commit(mutationTypes.addToFavoritesStart)

            const promise =
                isFavorited
                ? addToFavoritesApi.removeFromFavorites(slug)
                : addToFavoritesApi.addToFavorites(slug)

            promise.then(article=>{
                context.commit(mutationTypes.addToFavoritesSuccess, article)
                resolve(article)
            }).catch(()=>{
                context.commit(mutationTypes.addToFavoritesFailure)
            })
        })
    }
}

export default {
    actions,
    mutation
}