import { PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe(".findMany", () => {
    const posts = [
      { text: "Post 1" },
      { text: "Post 2" },
      { text: "Post 3" },
      { text: "Post 4" }
    ];

    beforeEach(() => {
      posts.forEach(post => postsService.create(post));
    });

    it("should return all posts if called without options", () => {
      const postsTest = postsService.findMany();
      expect(postsTest).toEqual(
        expect.arrayContaining([
          {
            id: "1",
            text: "Post 1"
          },
          {
            id: "2",
            text: "Post 2"
          },
          {
            id: "3",
            text: "Post 3"
          },
          {
            id: "4",
            text: "Post 4"
          }
        ])
      );
    });

    it("should return correct posts for skip options", () => {
      const skipTest = 1;
      const limitTest = 2;
      const testPosts = postsService.findMany({
        skip: skipTest,
        limit: limitTest
      });
      expect(testPosts).toEqual(
        expect.arrayContaining([
          {
            id: "2",
            text: "Post 2"
          },
          {
            id: "3",
            text: "Post 3"
          }
        ])
      );
    });

    it("should return correct posts for limit options", () => {
      const skipTest = 2;
      const limitTest = 1;
      const testPosts = postsService.findMany({
        limit: limitTest,
        skip: skipTest
      });
      expect(testPosts).toEqual(
        expect.arrayContaining([
          {
            id: "3",
            text: "Post 3"
          }
        ])
      );
    });

    it("should add a new post", () => {
      const testPost = postsService.create({ text: "Post 5" });
      expect(testPost).toEqual(
        expect.objectContaining({
          id: "5",
          text: "Post 5"
        })
      );
    });

    it("should find a post", () => {
      const idPost = "5";
      const postText = { text: "Post 5" };
      postsService.create(postText);
      const testFindPost = postsService.find(idPost);
      expect(testFindPost).toEqual(
        expect.objectContaining({
          id: idPost,
          text: postText.text
        })
      );
    });

    it("should return correct posts after delete", () => {
      const deleteId = "5";
      postsService.create({ text: "Post 5" });
      postsService.delete(deleteId);
      const postsTest = postsService.findMany();
      expect(postsTest).toEqual(
        expect.arrayContaining([
          {
            id: "1",
            text: "Post 1"
          },
          {
            id: "2",
            text: "Post 2"
          },
          {
            id: "3",
            text: "Post 3"
          },
          {
            id: "4",
            text: "Post 4"
          }
        ])
      );
    });

    it("should update post", () => {
      postsService.create({ text: "Post 5" });
      const postId = "5";
      const updateText = { id: postId, text: "Post 5 update" };
      postsService.update(postId, updateText);
      const postsTest = postsService.findMany();
      expect(postsTest).toEqual(
        expect.arrayContaining([
          {
            id: "1",
            text: "Post 1"
          },
          {
            id: "2",
            text: "Post 2"
          },
          {
            id: "3",
            text: "Post 3"
          },
          {
            id: "4",
            text: "Post 4"
          },
          {
            id: "5",
            text: updateText.text
          }
        ])
      );
    });
  });
});
