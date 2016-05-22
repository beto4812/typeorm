import {CreateConnectionOptions, createConnection} from "../../src/index";
import {Post} from "./entity/Post";
import {PostAuthor} from "./entity/PostAuthor";

const options: CreateConnectionOptions = {
    driver: "mysql",
    connection: {
        host: "192.168.99.100",
        port: 3306,
        username: "root",
        password: "admin",
        database: "test",
        autoSchemaCreate: true
    },
    entities: [Post, PostAuthor]
};

createConnection(options).then(connection => {

    let author = new PostAuthor();
    author.name = "Umed";
    
    let post = new Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.author = author;

    let postRepository = connection.getRepository(Post);

    postRepository
        .persist(post)
        .then(post => console.log("Post has been saved"))
        .catch(error => console.log("Cannot save. Error: ", error));

}, error => console.log("Cannot connect: ", error));