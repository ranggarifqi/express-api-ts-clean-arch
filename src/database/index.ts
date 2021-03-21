import 'reflect-metadata';
import { Connection, createConnections } from 'typeorm';
import moduleLogger from '../shared/logger';

const logger = moduleLogger('database');

export class DBConnection {
  private connections: Connection[];

  async createInstance(): Promise<void> {
    try {
      logger.info('Creating new database connection...');
      this.connections = await createConnections();
    } catch (e) {
      logger.error(e)
      return Promise.reject(e);
    }
  }

  async getConnection(connectionName = 'default'): Promise<Connection> {
    if (!this.connections) {
      await this.createInstance();
    }

    const conn = this.connections.find(v => {
      return v.name === connectionName;
    });

    if (!conn) {
      throw new Error(`Connection ${connectionName} not found`);
    }

    return conn;
  }
}