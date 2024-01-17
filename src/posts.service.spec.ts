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
            text: "Post 1"
          },
          {
            text: "Post 2"
          },
          {
            text: "Post 3"
          },
          {
            text: "Post 4"
          }
        ])
      );
    });

    it("should return correct posts for skip and limit options", () => {
      const skipTest = 2;
      const limitTest = 2;
      const testSkipPosts = postsService.findMany({ skip: skipTest });
      const testLimitPosts = postsService.findMany({ limit: limitTest });
      expect(testSkipPosts).toEqual(
        expect.arrayContaining([
          {
            text: "Post 3"
          },
          {
            text: "Post 4"
          }
        ])
      );
      expect(testLimitPosts).toEqual(
        expect.arrayContaining([
          {
            text: "Post 1"
          },
          {
            text: "Post 2"
          }
        ])
      );
    });

    it("should add a new post", () => {
      const testPost = postsService.create({ text: "Post 5" });
      expect(testPost).toEqual(
        expect.objectContaining({
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
          text: postText.text
        })
      );
    });

    it("should return correct posts after delete", () => {
      const deleteId = "2";
      postsService.delete(deleteId);
      const postsTest = postsService.findMany();
      expect(postsTest).toEqual(
        expect.arrayContaining([
          {
            text: "Post 1"
          },
          {
            text: "Post 3"
          },
          {
            text: "Post 4"
          }
        ])
      );
    });

    it("should update post", () => {
      const postId = "4";
      const updateText = { id: postId, text: "Post 4 update" };
      postsService.update(postId, updateText);
      const postsTest = postsService.findMany();
      expect(postsTest).toEqual(
        expect.arrayContaining([
          {
            text: "Post 1"
          },
          {
            text: "Post 2"
          },
          {
            text: "Post 3"
          },
          {
            text: updateText.text
          }
        ])
      );
    });
  });
});
