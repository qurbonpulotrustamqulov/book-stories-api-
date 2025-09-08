import data from '../db.json';

export default function handler(req, res) {
  const { query } = req;
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "6");
  const id = query.id ? parseInt(query.id) : null;

  // detail (id bo'yicha)
  if (id) {
    const story = data.stories.find(s => s.id === id);
    if (!story) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(story);
  }

  // list + pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = data.stories.slice(start, end);

  res.status(200).json({
    total: data.stories.length,
    page,
    limit,
    data: paginated
  });
}
