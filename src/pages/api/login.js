export default function handler(req, res) {
    if (req.method === "GET") {
      res.status(200).json([{ username: "UserSample", password: "123456" }]);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  