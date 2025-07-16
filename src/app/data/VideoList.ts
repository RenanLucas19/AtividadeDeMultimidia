export type Video = {
    url: string;
    image: string;
    name: string;
    description: string;
}

const videos: Video[] = [
    {
        url: "assets/video/video01.mp4",
        image: "assets/image/video01.jpg",
        description: "Video da musica young and beautiful - Lana del rey",
        name: "Lana Del Rey"
    },
    {
        url: "assets/video/video02.mp4",
        image: "assets/image/video02.jpg",
        description: "Video da musica summertime sadness - lana del rey ",
        name: "Lana Del Rey"
    }
]

export default videos;