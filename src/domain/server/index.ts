export interface Server<TApiFramework, TDBConnection> {
  app: TApiFramework;
  dbConn: TDBConnection;
}