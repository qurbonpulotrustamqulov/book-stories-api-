import data from '../db.json';

export default function handler(req, res) {
  const { page = 1, limit = 6, id } = req.query;

  if (id) {
    const story = data.stories.find(s => s.id === Number(id));
    if (!story) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(story);
  }

  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginated = data.stories.slice(start, end);

  res.status(200).json({
    total: data.stories.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated
  });
}
