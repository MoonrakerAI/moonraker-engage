/* ... existing code ... */
import * as redis from 'redis';

// ... other imports ...

const redisClient = redis.createClient();

async function getCachedData(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data || 'null'));
    });
  });
}

async function setCachedData(key: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    redisClient.set(key, JSON.stringify(data), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Example usage within a service method:
async findPatient(id: number): Promise<Patient | null> {
  const cacheKey = `patient:${id}`;
  const cachedData = await getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const patient = await this.prisma.patient.findUnique({ where: { id } });
  await setCachedData(cacheKey, patient);
  return patient;
}
/* ... rest of the code ... */