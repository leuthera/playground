let fetch        = require( 'node-fetch' )
let LaunchDarkly = require( 'ldclient-node' )

let sdk_key      = process.env.APPEnv === 'dev'
    ? ''
    : ''

let client       = LaunchDarkly.init( sdk_key )
let uid          = process.argv[ 2 ]

const flickr_api_key = ''

let user = { key: uid }

let delay = sec => new Promise( resolve => setTimeout( resolve, sec * 1000 ) )

function flickr_search( tag ) {
    function animal_images( tag, page ) {
        let flickr = 'https://api.flickr.com/services/rest/' + 
            '?method=flickr.photos.search' +
            '&api_key=' + flickr_api_key +
            '&page=' + page +
            '&tags=' + tag + 
            '&format=json' + 
            '&nojsoncallback=1'

        return fetch( flickr )
            .then( response => response.json() )
            .then( body => body.photos.photo )
            .then( photos => photos.map( photo =>
                `https://farm${photo.farm}.staticflickr.com/` +
                `${photo.server}/${photo.id}_${photo.secret}_q.jpg` 
            ))
    }

    return {
        [Symbol.asyncIterator]: async function* () {
            let page_idx = 1

            while ( true ) {
                const page_data = await animal_images( tag, page_idx )
                for ( const url of page_data ) {
                    await delay(1)
                    yield url
                }
            }
        }
    }
}

client.once('ready', () => {
    client.variation('animal-toggle', user, false, ( err, animal_variation ) => {
        let animal = animal_variation
        
        ;(async () => {
            for await ( const url of flickr_search( animal ) )
                console.log(`${animal_variation}: ${url}`)
        })()

        client.flush( client.close )
    })
})
