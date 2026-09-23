export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    institution: 'Chinmaya Vidyalaya, Tarapur',
    affiliationNo: '1130058',
    udiseNo: '27361116004',
    resendConfigured: true,
    timestamp: new Date().toISOString(),
  });
}
