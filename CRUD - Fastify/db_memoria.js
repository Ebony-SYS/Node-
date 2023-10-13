import { randomUUID } from "node:crypto"

export class DatabaseMemoria {

    #videos = new Map()

    getall(search) {
        return Array.from(this.#videos.entries())
            .map((videoArray) =>{
                const id = videoArray[0]
                const data = videoArray[1]

                return {
                    id,
                    ...data,
                }
            })
            .filter(video => {
                if (search) {
                    return video.title.includes(search)
                }
                return true
            })
    }

    create(video) {
        // UUID - Universal Unique ID
        const id_video = randomUUID() 
        this.#videos.set(id_video, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}

