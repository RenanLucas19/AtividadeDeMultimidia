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
        description: "Young and beautiful",
        name: ""
    },
    {
        url: "assets/video/video02.mp4",
        image: "assets/image/video02.jpg",
        description: "Summertime sadness",
        name: ""
    },
    {
        url: "assets/video/video03.mp4",
        image: "assets/image/video03.jpg",
        description: "Born to die",
        name: ""
    }
]

export default videos;