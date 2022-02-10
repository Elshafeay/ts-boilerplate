import { QueryTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize';
import Logger from '../middlewares/logger';

interface InserQuery{
  data: any,
  inserted: number
}

class Common {

  // Any is used here because we can't determine the object structure ahead
  // as this is used for the insertion of different models
  static async dbInsertion(table: string, obj: any): Promise<InserQuery | void>{
    try{
      const [ row, inserted ] = await sequelize.query(
        `
          INSERT INTO ${table} (${Object.keys(obj).map(k => k).join(', ')})
          Values (${Object.values(obj).map(k => `'${k}'`).join(', ')}) RETURNING *;
        `,
        {
          type: QueryTypes.INSERT,
        },
      );
      // sequelize doesn't know that I'm returning the full inserted object, not just its id
      return {
        data: (row as unknown) as any,
        inserted,
      };
    }catch(err){
      Logger.error('SEQUELIZE ERROR: ', err);
    }
  }

  // Any is used here because we can't determine the object structure ahead
  // as this is used for the selection of different models
  static async dbFetch(table: string, conditions:any = null, selections:any = null){
    try{

      let query, replacements;

      const select = selections? `${selections.join(', ')}`: '*';

      if(conditions){
        query = `
          select ${select} from ${table}
          where ${(Object.keys(conditions).map(k => `${k} = ?`)).join(' AND ')};
        `;
        replacements = [ ...Object.values(conditions) ];
      }
      else{
        query = `select ${select} from ${table};`;
        replacements = undefined;
      }

      const rows = await sequelize.query(
        query,
        {
          replacements,
          type: QueryTypes.SELECT,
        },
      );

      return Array.from(rows);
    }catch(err){
      Logger.error('SEQUELIZE ERROR: ', err);
    }
  }

  // Any is used here because we can't determine the object structure ahead
  // as this is used for updating different models
  static async dbUpdate(table: string, data: any, conditions: any){
    try{
      const [results, updated] = await sequelize.query(
        `
          update ${table} set ${Object.keys(data).map(k => `${k} = ?`)}
          where ${(Object.keys(conditions).map(k => `${k} = ?`)).join(' AND ')};
        `,
        {
          replacements: [ ...Object.values(data), ...Object.values(conditions) ],
          type: QueryTypes.UPDATE,
        },
      );
      return {
        data: (results as unknown) as any,
        updated,
      };
    }catch(err){
      Logger.error('SEQUELIZE ERROR: ', err);
    }
  }

  // Any is used here because we can't determine the object structure ahead
  // as this is used for the deletion of different models
  static async dbDeletion(table: string, conditions: any){
    try{
      return await sequelize.query(
        `
          Delete from ${table}
          where ${(Object.keys(conditions).map(k => `${k} = ?`)).join(' AND ')};
        `,
        {
          replacements: [ ...Object.values(conditions) ],
          type: QueryTypes.DELETE,
        },
      );
    }catch(err){
      Logger.error('SEQUELIZE ERROR: ', err);
    }
  }

  // Truncate all the tables in the database
  static async dbTruncate(){
    try{
      const tables = await sequelize.query(
        'SELECT * FROM information_schema.tables WHERE table_schema = \'public\';',
      );
      const tablesNames = tables[0]
        .map((t:any) => t.table_name)
        .filter(tableName => tableName !== 'migrations');

      let finalQuery = '';

      tablesNames.forEach(tableName => {
        finalQuery += `TRUNCATE TABLE ${tableName} CASCADE; `;
      });

      return await sequelize.query(finalQuery);
    }catch(err){
      Logger.error('SEQUELIZE ERROR: ', err);
    }
  }
}
export default Common;
