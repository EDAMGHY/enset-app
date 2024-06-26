export const calculatePagination = (limit: number, response: any) => {
  const count = parseInt(response.headers.get('X-Total-Count')!);
  const total = Math.ceil(count / limit);
  return {
    pages: Array.from({ length: total }).map((_, i) => i + 1) || [],
    count,
  };
};
