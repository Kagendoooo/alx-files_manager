import RedisClient from '../utils/redis';
import dbClient from '../utils/db';

// GET Redis Status
class AppController {
  static async getStatus(req, res) {
    const status = {
      redis: RedisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).json(status);
  }

  // GET stats
  static async getStats(req, res) {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();
      const stats = {
        users: usersCount,
        files: filesCount,
      };
      res.status(200).json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error.message);
      res.status(500).json({ error: 'An Error occcured in fetching stats' });
    }
  }
}

export default AppController;
