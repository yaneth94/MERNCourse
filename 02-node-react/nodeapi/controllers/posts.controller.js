const getPosts = (req, res) => {
    res.json({
        posts: [
            { title: "First Post" },
            { title: "Second Post" },
            { title: "Third Post" },
        ],
    });
};

module.exports = {
    getPosts,
};