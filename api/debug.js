export default function handler(req, res) {
  res.json({
    query: req.query,
    url: req.url,
    method: req.method
  });
}
