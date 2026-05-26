export default async ({ req, res, log }: {
  req: {
    body: string;
    method: string;
    path: string;
    headers: Record<string, string>;
  };
  res: {
    json: (data: unknown, statusCode?: number) => void;
    send: (body: string, statusCode?: number) => void;
  };
  log: (msg: string) => void;
  error: (msg: string) => void;
}) => {
  log('Function triggered successfully');

  const body = req.body ? JSON.parse(req.body) : {};
  const name: string = body.name ?? 'stranger';

  return res.json({
    success: true,
    message: `Hello, ${name}!`,
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
  });
};