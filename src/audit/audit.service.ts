import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Logs an audit action to the database.
 * @param userId The ID of the user performing the action.
 * @param action The type of action performed (e.g., 'LOGIN', 'UPDATE_PRACTICE_INFO').
 * @param details Additional details about the action as a JSON object.
 */
export async function logAuditAction(userId: string, action: string, details: any): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: userId,
        action: action,
        details: details, // Store the JSON details
        timestamp: new Date(),
        // Consider adding ipAddress and userAgent here if available from the request context
      },
    });
    console.log(`Audit log created: User ${userId}, Action ${action}`);
  } catch (error) {
    console.error('Failed to write audit log:', error);
    // In a production environment, you would want more robust error handling,
    // such as sending an alert or retrying the logging operation.
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client after logging
  }
}