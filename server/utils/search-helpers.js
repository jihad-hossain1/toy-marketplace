const buildSearchQuery = (searchTerm, fields = []) => {
  if (!searchTerm || fields.length === 0) return {};

  const regex = { $regex: searchTerm, $options: "i" };
  const orConditions = fields.map((field) => ({ [field]: regex }));

  return {
    $or: orConditions,
  };
};

const parseQueryParams = (searchParams) => {
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  return {
    page: page > 0 ? page : 1,
    pageSize: pageSize > 0 ? pageSize : 10,
    sortBy,
    sortOrder: sortOrder === "desc" ? -1 : 1,
  };
};

module.exports = { buildSearchQuery, parseQueryParams };
